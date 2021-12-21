import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  Flex,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="pGray.800" w="auto" maxW={['auto', '900px']}>
        <ModalBody p="0">
          <Image src={imgUrl} alt="Imagem" maxW="900px" maxH="600px" />
        </ModalBody>

        <ModalFooter>
          <Flex flex="1" justify="flex-start">
            <Link href={imgUrl} isExternal>
              Abrir original
            </Link>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
