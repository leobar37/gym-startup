import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Text,
  useToken,
  useTheme,
  HStack,
  Button,
  FormControl,
  ModalBody,
  FormLabel,
  Input,
  ModalProps,
  BoxProps,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter
} from '@chakra-ui/react';
import { FunctionComponent, ReactNode } from 'react';
import { TextOrChild, ChildrenOrText } from '../children';
import { Box } from '@chakra-ui/react';
import { SafeAny } from '@wellness/common';

export type UdpateActionsProps = {
  onReset: () => void;
  onSave: () => void;
};
/**
 *
 * This is a utility for working with formik
 *
 */
export const ChackraForm: FunctionComponent<{ submit?: SafeAny } & BoxProps> =
  ({ submit, children, ...props }) => {
    return (
      <Box as="form" onSubmit={submit} {...props}>
        {children}
      </Box>
    );
  };

export const UdpateActions = ({ onReset, onSave }: UdpateActionsProps) => {
  return (
    <HStack>
      <Button onClick={onReset} variant="ghost">
        Restablecer
      </Button>
      <Button onClick={onSave}>Guardar Cambios</Button>
    </HStack>
  );
};

export type SaveActionsProps = {
  onCancel: () => void;
  onSave: () => void;
};

export const SaveActions = ({ onCancel, onSave }: SaveActionsProps) => {
  return (
    <HStack>
      <Button onClick={onCancel} variant="ghost">
        Cancelar
      </Button>
      <Button type="submit" onClick={onSave}>
        Guardar
      </Button>
    </HStack>
  );
};

type TMode = 'EDIT' | 'CREATE';

type ModalCrudProps = {
  overlay?: boolean;
  textHeader: TextOrChild;
  /**
   *
   */
  footer: ReactNode;
  mode?: TMode;
} & Pick<ModalProps, 'isOpen' | 'onClose' | 'isCentered' | 'motionPreset'>;

export const ModalCrud: FunctionComponent<ModalCrudProps> = ({
  children,
  overlay,
  textHeader,
  isOpen,
  onClose,
  isCentered,
  motionPreset,
  footer,
}) => {
  const [gray500] = useToken('colors', ['gray.500']);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
    >
      {overlay && <DrawerOverlay />}
      <DrawerContent position="relative" borderRadius="0" minWidth="700px">
        <DrawerCloseButton />
        <DrawerHeader borderBottom={`5px solid ${gray500}`}>
          <ChildrenOrText
            onText={(val) => <Text fontWeight="semibold">{val}</Text>}
          >
            {textHeader}
          </ChildrenOrText>
        </DrawerHeader>
        <DrawerBody mx={4} mt={4} mb={'100px'} overflowY="scroll" height="auto">
          {children}
        </DrawerBody>
        <DrawerFooter w={'100%'} left="0" position="absolute" bottom="0">
          {footer}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

ModalCrud.defaultProps = {
  overlay: true,
  mode: 'CREATE',
};
