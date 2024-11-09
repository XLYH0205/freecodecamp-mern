import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';
import { Toaster } from "../components/ui/toaster"

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log("products: ", products);

  return (
    <Container maxW={'container.xl'} py={12}>
      <Toaster />
      <VStack gap={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          textAlign={"center"}
        >
          Current Products
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3
          }}
          gap={10}
          w={'full'}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text
            fontSize='xl'
            fontWeight={"bold"}
            textAlign={"center"}
            color={'gray.500'}
          >
            No products found... {' '}

            <Link to={'/create'}>
              <Text
                as={'span'}
                _hover={{ textDecoration: 'underline' }}
                color={'blue.500'}
              >
                Create a Product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  )
}

export default HomePage;