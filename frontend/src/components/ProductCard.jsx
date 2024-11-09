import { Box, Button, Heading, HStack, IconButton, Image, Input, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { RiDeleteBinLine, RiEditLine } from "react-icons/ri";
import { useColorModeValue } from './ui/color-mode';
import { useProductStore } from '../store/product';
import { toaster } from './ui/toaster';
import { Field } from "./ui/field"
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";

const ProductCard = ({ product }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product)

    const textColor = useColorModeValue('gray.600', 'gray.200')
    const bg = useColorModeValue('white', 'gray.800')

    const { updateProduct, deleteProduct } = useProductStore()


    const handleDeleteProduct = async (id) => {
        const { success, message } = await deleteProduct(id)
        if (!success) {
            toaster.create({
                title: 'Error',
                description: message,
                type: 'error',
                duration: 3000
            })
        }
        else {
            toaster.create({
                title: 'Success',
                description: message,
                type: 'success',
                duration: 3000
            })
        }
    }

    const handleUpdateProduct = async (id, updatedProduct) => {
        const { success, message } = await updateProduct(id, updatedProduct)
        if (!success) {
            toaster.create({
                title: 'Error',
                description: message,
                type: 'error',
                duration: 3000
            })
        }
        else {
            toaster.create({
                title: 'Success',
                description: 'Product updated successfully',
                type: 'success',
                duration: 3000
            })
        }
        console.log("update")
    }

    return (
        <Box
            shadow={'lg'}
            rounded={'lg'}
            overflow={'hidden'}
            transition={'all 0.3s'}
            _hover={{ transform: 'translateY(-10px)', shadow: 'xl' }}
            bg={bg}
        >
            <Image
                src={product.image}
                alt={product.name}
                h={48}
                w={'full'}
                objectFit={'cover'}
            />

            <Box p={4}>
                <Heading
                    as={'h3'}
                    size={'xl'}
                    mb={2}
                >
                    {product.name}
                </Heading>

                <Text
                    fontWeight={'bold'}
                    fontSize={'xl'}
                    color={textColor}
                    mb={4}
                >
                    ${product.price}
                </Text>

                <HStack gap={2}>
                    <DialogRoot>
                        <DialogTrigger asChild>
                            <IconButton colorPalette={'blue'}>
                                <RiEditLine />
                            </IconButton>
                            {/* <Button variant="outline" size="sm">
                                Open Dialog
                            </Button> */}
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Update Product</DialogTitle>
                            </DialogHeader>

                            <DialogBody>
                                <VStack gap={4}>
                                    <Field label='Product Name'>
                                        <Input
                                            name='name'
                                            placeholder='Product Name'
                                            value={updatedProduct.name}
                                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                                        />
                                    </Field>
                                    <Field label='Price'>
                                        <Input
                                            name='price'
                                            placeholder='Price'
                                            value={updatedProduct.price}
                                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                                        />
                                    </Field>
                                    <Field label='Image URL'>
                                        <Input
                                            name='image'
                                            placeholder='Image URL'
                                            value={updatedProduct.image}
                                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                                        />
                                    </Field>
                                </VStack>
                            </DialogBody>
                            <DialogFooter>
                                <DialogActionTrigger asChild>
                                    <Button variant='outline'>Cancel</Button>
                                </DialogActionTrigger>
                                <DialogActionTrigger asChild>
                                    <Button onClick={() => handleUpdateProduct(product._id, updatedProduct)} colorPalette={'blue'}>Save</Button>
                                </DialogActionTrigger>
                            </DialogFooter>
                            <DialogCloseTrigger />
                        </DialogContent>
                    </DialogRoot>


                    <IconButton
                        colorPalette={'red'}
                        onClick={() => handleDeleteProduct(product._id)}
                    >
                        <RiDeleteBinLine />
                    </IconButton>
                </HStack>
            </Box>

        </Box>
    )
}

export default ProductCard