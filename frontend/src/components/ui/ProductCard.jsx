import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
  useToast,
  useDisclosure,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Input,
  ModalFooter,
  Button,
  Image,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useProductStore } from '../../store/product';

const ProductCard = ({ product }) => {
  const bg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.100');
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteProduct, updateProduct, fetchProducts } = useProductStore();
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
    if (success) {
      await fetchProducts();
    }
  };

  const handleUpdate = async () => {
    const { success, message } = await updateProduct(product._id, updatedProduct);
    if (success) {
      onClose();
      await fetchProducts();
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
    <Box shadow="lg" rounded="lg" overflow="hidden" bg={bg} borderWidth="1px" borderColor={useColorModeValue('gray.200', 'gray.600')}>
      <Image src={product.image} alt={product.name} h={56} w="full" objectFit="cover" />

      <Box p={5}>
        <Heading as="h3" size="md" mb={3} color={textColor}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color="blue.400" mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton aria-label="Edit product" icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
          <IconButton aria-label="Delete product" icon={<DeleteIcon />} onClick={handleDelete} colorScheme="red" />
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
                placeholder="Product Name"
                value={updatedProduct.name}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
              />
              <Input
                placeholder="Price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: Number(e.target.value) })}
              />
              <Input
                placeholder="Image URL"
                value={updatedProduct.image}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
