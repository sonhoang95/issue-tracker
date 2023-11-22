import IssueBadge from "@/app/components/IssueBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({ where: { id: params.id } });

  if (!issue) notFound();

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="3">
        <IssueBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card mt="4" className="prose">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </div>
  );
};
export default IssueDetailsPage;
