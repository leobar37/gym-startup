import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { IntervalTimeEnum } from '@wellness/common';
import { Asistence, Client, Contract } from "@wellness/core";
import addDays from 'date-fns/addDays';
import addMoth from 'date-fns/addMonths';
import addWeeks from 'date-fns/addWeeks';
import startOfMonth from 'date-fns/startOfMonth';
import startOfTheWeek from 'date-fns/startOfWeek';
import startOfTheYear from 'date-fns/startOfYear';
import { Between, EntityManager } from 'typeorm';
import { TypeDataEnum } from "../dto/growth.dto";
import { ReportGrowthBuilder } from "./GrowthBuilder";

@Injectable()
export class GrowthHelper {
  constructor(@InjectEntityManager() private manager: EntityManager , private growthBuilder : ReportGrowthBuilder) {}

  async growthReport(strategy: TypeDataEnum, interval: IntervalTimeEnum) {
    switch (strategy) {
      case TypeDataEnum.plans: {
        return this.plansReport(interval);
      }
      case TypeDataEnum.asistences: {
        return this.asistencesReport(interval);
      }
      case TypeDataEnum.register_clients: {
        return this.registeredClientsReport(interval);
      }
    }
  }
  async registeredClientsReport(interval: IntervalTimeEnum){
    const [start, end] = this.getInterval(interval);
    const clients = await this.manager.find(Client,  {
      where: {
        createdAt: Between(start, end),
      },    
    })
    return this.growthBuilder.build(interval, [start, end], clients)
  }
  async asistencesReport(interval: IntervalTimeEnum) {
    const [start , end] = this.getInterval(interval);
    const asistences =  await this.manager.find(Asistence , {
       where : {
         createdAt :  Between(start , end)
       }
    })
    return this.growthBuilder.build(interval, [start , end], asistences)
  }
  async plansReport(interval: IntervalTimeEnum) {
    const [start, end] = this.getInterval(interval);
    const contracts = await this.manager.find(Contract, {
      where: {
        createdAt: Between(start, end),
      },
    });
    return this.growthBuilder.build(interval, [start, end], contracts)
  }

  private getInterval(interval: IntervalTimeEnum) {
    switch (interval) {
      case IntervalTimeEnum.LAST_WEEK: {
        const now = new Date();
        return [
          startOfTheWeek(now, {
            weekStartsOn: 1,
          }),
          addDays(now, 1),
        ];
      }
      case IntervalTimeEnum.LAST_YEAR: {
        const now = new Date();
        return [startOfTheYear(now), addMoth(now, 1)];
      }
      case IntervalTimeEnum.LAST_MONTH: {
        const now = new Date();
        return [startOfMonth(now), addWeeks(now, 1)];
      }
    }
  }
}
