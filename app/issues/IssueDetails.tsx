import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import Markdown from "react-markdown";
import { IssueBadge } from "../components";
import { Issue } from "@prisma/client";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="3">
        <IssueBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card mt="4" className="prose">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </>
  );
};
export default IssueDetails;
