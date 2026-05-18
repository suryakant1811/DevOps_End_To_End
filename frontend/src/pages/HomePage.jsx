import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  Heading,
  HStack,
  Input,
  Select,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ui/ProductCard';

const HomePage = () => {
  const { fetchProducts, products, loading, error } = useProductStore();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('latest');

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (search.trim()) {
      const term = search.toLowerCase();
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(term)
      );
    }

    if (sort === 'price-asc') {
      filtered = [...filtered].sort((a, b) => Number(a.price) - Number(b.price));
    }
    if (sort === 'price-desc') {
      filtered = [...filtered].sort((a, b) => Number(b.price) - Number(a.price));
    }

    return filtered;
  }, [products, search, sort]);

  return (
    <Container maxW={'container.xl'} py={12}>
      <VStack spacing={8} alignItems={'stretch'}>
        <Box
          p={8}
          bg={useColorModeValue('blue.50', 'gray.700')}
          rounded={'3xl'}
          shadow={'sm'}
        >
          <HStack justifyContent={'space-between'} flexWrap={'wrap'} gap={4}>
            <Box>
              <Heading size={'xl'} mb={2}>
                Product Store
              </Heading>
              <Text color={'gray.500'}>
                Browse items, edit product details, or add new listings with one click.
              </Text>
            </Box>
            <HStack spacing={2}>
              <Badge colorScheme='purple' py={2} px={3} rounded='full'>
                {products.length} Products
              </Badge>
              <Button as={Link} to='/create' colorScheme='blue'>
                Add new item
              </Button>
            </HStack>
          </HStack>
        </Box>

        <Box
          p={6}
          bg={useColorModeValue('white', 'gray.800')}
          rounded={'3xl'}
          shadow={'sm'}
        >
          <HStack flexWrap={'wrap'} spacing={4}>
            <Input
              placeholder='Search products...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              maxW={{ base: 'full', md: '380px' }}
            />
            <Select
              maxW={{ base: 'full', md: '240px' }}
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value='latest'>Newest first</option>
              <option value='price-asc'>Price: low to high</option>
              <option value='price-desc'>Price: high to low</option>
            </Select>
            <Button colorScheme='teal' onClick={fetchProducts}>
              Refresh
            </Button>
          </HStack>
        </Box>

        {loading && (
          <Center py={20}>
            <Spinner size='xl' />
          </Center>
        )}

        {error && (
          <Center py={10}>
            <Text color='red.500' fontWeight='bold'>
              {error}
            </Text>
          </Center>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w={'full'}>
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <Center py={20} flexDirection={'column'}>
            <Text fontSize={24} fontWeight={'bold'}>
              No matching products found.
            </Text>
            <Text color={'gray.500'} my={3}>
              Try a different search or add a new product.
            </Text>
            <Button as={Link} to='/create' colorScheme='blue'>
              Create a product
            </Button>
          </Center>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;

