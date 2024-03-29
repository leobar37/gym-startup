import { Contract, Suscription } from '@wellness/core';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { ModeSuscription } from '@wellness/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { asyncObservable } from '@wellness/core';
import { WelnessLogger } from '@wellness/core';
@Injectable()
export class SuscriptionsScheduler {
  constructor(
    @InjectEntityManager() private manager: EntityManager,
    private logger: WelnessLogger
  ) {}
  
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async verifyContracts() {
    this.logger.info(
      `executing verifyContracts ${new Date().toLocaleString()}`
    );
    const subs = await this.manager.find(Suscription, {
      where: {
        active: true,
      },
    });
    from(subs)
      .pipe(
        // modify suscription if is necesary
        switchMap((sub) =>
          asyncObservable(async (observer) => {
            if (sub.mode == ModeSuscription.DINAMIC) {
              return sub;
            }
            if (sub.getDaysToFinish() == 0) {
              await this.manager.update(Suscription, sub.id, {
                active: false,
              });
              sub.active = false;
            }
            return sub;
          })
        ),
        switchMap((sub: Suscription) =>
          asyncObservable(async (observer) => {
            const contracts = await sub.contracts;
            const affectedContracts: Contract[] = [];
            for (const contract of contracts) {
              const days = contract.getDaysToFinish();
              if (days == 0) {
                contract.finished = true;
                affectedContracts.push(contract);
              }
            }
            this.manager.transaction((manager) => {
              return Promise.all(
                affectedContracts.map(async (contract) => {
                  await manager.update(Contract, contract.id, {
                    finished: true,
                  });
                })
              );
            });
            return affectedContracts;
          })
        )
      )
      .subscribe((contracts) => {
        this.logger.info(`Contracts have been verified`, {
          affected: contracts,
        });
      });
  }
}
