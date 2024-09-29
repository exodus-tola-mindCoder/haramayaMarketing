import { Box, Button, Container, Heading, VStack, Input, useColorModeValue, useToast } from "@chakra-ui/react";
import { useState } from "react"
import { useProductStore } from "../store/product";
const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const toast = useToast()

  const {createProduct} = useProductStore()

  const handleAddProduct = async() => {
    const {success, message} = await createProduct(newProduct)
    if(!success) {
      toast({
        title: "Error",
        description: message,
        status:"error",
        isClosable: true
      })
    } else {
      toast({
        title: "Success",
        description: "success",
        status: "success",
        isClosable: true
      })
    }
    setNewProduct({name: "", price: "", image: ""}); // reset the state
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack
        spacing={8}
      >
        <Heading as={"p"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>
        <Box 
          w={"full"} bg={useColorModeValue("white", "grey.800")} p={6} rounded={"lg"} shadow={"md"}
        >
          <VStack spacing={4}>
            <Input 
              placeholder='Product Name'
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
            <Input 
              placeholder='Price'
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
            <Input 
              placeholder='Image URL'
              name="Image"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          />
          <Button colorScheme="blue" onClick={handleAddProduct} w={"full"}>
            Add  Product
          </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage