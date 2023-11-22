import { Flex, Card, Box } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const LoadingIssueDetailPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex gap="3" my="3">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card mt="4" className="prose">
        <Skeleton count={5} />
      </Card>
    </Box>
  );
};
export default LoadingIssueDetailPage;
