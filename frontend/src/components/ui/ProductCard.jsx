import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
  Input,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useProductStore } from '../../store/product';

const ProductCard = ({ product }) => {
  const bg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.100');
  const cardHoverBg = useColorModeValue('gray.50', 'gray.600');
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteProduct, updateProduct } = useProductStore();
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleDelete = async () => {
    const { success, message } = await deleteProduct(product._id);
    toast({
      title: success ? 'Deleted' : 'Error',
      description: message,
      status: success ? 'success' : 'error',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUpdate = async () => {
    const { success, message } = await updateProduct(product._id, updatedProduct);
    if (success) {
      onClose();
    }
    toast({
      title: success ? 'Updated' : 'Error',
      description: message,
      status: success ? 'success' : 'error',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      borderWidth='1px'
      borderRadius='2xl'
      overflow='hidden'
      bg={bg}
      transition='transform 0.2s ease, box-shadow 0.2s ease'
      _hover={{ transform: 'translateY(-5px)', shadow: 'lg', bg: cardHoverBg }}
    >
      <Image src={product.image} alt={product.name} h={56} w='full' objectFit='cover' />
      <Box p={5}>
        <HStack justifyContent='space-between' mb={3}>
          <Heading as='h3' size='md' color={textColor}>
            {product.name}
          </Heading>
          <Badge colorScheme='purple'>Featured</Badge>
        </HStack>

        <Text fontSize='xl' fontWeight='bold' color='blue.500' mb={4}>
          ${product.price}
        </Text>

        <Text mb={4} color='gray.500'>
          Click edit to update the title, price, or image.
        </Text>

        <HStack spacing={3}>
          <IconButton
            aria-label='Edit product'
            icon={<EditIcon />}
            onClick={onOpen}
            colorScheme='blue'
          />
          <IconButton
            aria-label='Delete product'
            icon={<DeleteIcon />}
            onClick={handleDelete}
            colorScheme='red'
          />
          <Button size='sm' variant='outline' onClick={() => window.open(product.image, '_blank')}>
            View image
          </Button>
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder='Product Name'
                value={updatedProduct.name}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
              />
              <Input
                placeholder='Price'
                type='number'
                value={updatedProduct.price}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: Number(e.target.value) })}
              />
              <Input
                placeholder='Image URL'
                value={updatedProduct.image}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleUpdate}>
              Save changes
            </Button>
            <Button variant='ghost' onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
