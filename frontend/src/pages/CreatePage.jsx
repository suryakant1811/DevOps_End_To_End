import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '../store/product';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  });
  const toast = useToast();
  const { createProduct } = useProductStore();
  const navigate = useNavigate();

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      toast({
        title: 'Missing fields',
        description: 'Please fill out all fields before submitting.',
        status: 'warning',
        duration: 3500,
        isClosable: true,
      });
      return;
    }

    const { success, message } = await createProduct({
      ...newProduct,
      price: Number(newProduct.price),
    });

    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 3500,
        isClosable: true,
      });
      return;
    }

    toast({
      title: 'Product created',
      description: message,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    setNewProduct({ name: '', price: '', image: '' });
    navigate('/');
  };

  return (
    <Container maxW={'container.sm'} py={12}>
      <VStack spacing={8} alignItems={'stretch'}>
        <Box
          p={8}
          bg={useColorModeValue('white', 'gray.800')}
          rounded={'3xl'}
          shadow={'md'}
        >
          <Heading as={'h1'} size={'2xl'} textAlign={'center'} mb={6}>
            Create new product
          </Heading>

          <VStack spacing={4}>
            <Input
              placeholder='Product Name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              placeholder='Price'
              type='number'
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <Input
              placeholder='Image URL'
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />

            {newProduct.image && (
              <Box w='full' borderWidth='1px' borderRadius='lg' overflow='hidden'>
                <img
                  src={newProduct.image}
                  alt='Preview'
                  style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                />
              </Box>
            )}

            <Button colorScheme='blue' size='lg' onClick={handleAddProduct} w='full'>
              Add product
            </Button>

            <Text color='gray.500' textAlign='center'>
              Tip: use a full image URL so the product preview appears instantly.
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
