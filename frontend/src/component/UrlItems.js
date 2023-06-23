import { Box, Text } from "@chakra-ui/react";
import React from "react";

const UrlItems = ({ data }) => {
    // console.log(data)
    return (
        <Box
            cursor="pointer"
            bg="#E8E8E8"
            _hover={{
                background: "#38B2AC",
                color: "white",
            }}
            width="100%"
            display="flex"
            alignItems="center"
            color="black"
            px={3}
            py={2}
            mb={2}
            borderRadius="lg"
        >
            <Box  width="100%"  px={3}
            py={2}
            mb={2}>
                <Text fontSize="xs">
                    <b>OrgUrl: </b>
                    {data.orgUrl}
                </Text>
                <Text fontSize="xs">
                    <b>ShortUrl : </b>
                    {data.shortUrl}
                </Text>
                <Text fontSize="xs">
                    <b>Note : </b>
                    {data.note}
                </Text>
            </Box>
        </Box>
    )
}
export default UrlItems;