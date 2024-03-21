import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { Node, getNodeLabel, nodeToGraphNode } from "../services/nodeService";
import { PiGraph } from "react-icons/pi";
import { SlTarget } from "react-icons/sl";
import { useApemanGraph } from "../hooks/useApemanGraph";
import { Path } from "../services/pathService";
import NodeListItem from "./NodeListItem";

interface Props {
  nodes: Node[];
  name: string;
  pathFunction?: (n: Node) => void;
}

const AccordionList = ({ nodes, name, pathFunction }: Props) => {
  const { setNodes, addNode } = useApemanGraph();
  if (nodes === null) {
    return <></>;
  }
  return (
    <AccordionItem width="100%">
      <HStack width="100%" justifyContent="left">
        <AccordionButton width="100%" justifyContent="space-between">
          <Text width="80%" textAlign="left">
            {name}
          </Text>
          <Text width="10%">{nodes.length}</Text>
          <AccordionIcon width="10%"></AccordionIcon>
        </AccordionButton>
        <Button
          onClick={() => {
            //setNodes([]);
            nodes.map((node) => {
              if (pathFunction) {
                pathFunction(node);
              }
            });
          }}
        >
          <PiGraph />
        </Button>
      </HStack>
      <AccordionPanel>
        <Table overflowX="scroll">
          <Tbody>
            {nodes.map((node) => (
              <Tr key={node.id}>
                <Td textOverflow="ellipsis" width="80%">
                  {getNodeLabel(node)}
                </Td>

                {pathFunction && (
                  <Td width="20%">
                    <Button
                      size="xs"
                      onClick={() => {
                        if (pathFunction) {
                          pathFunction(node);
                        }
                      }}
                    >
                      <PiGraph />
                    </Button>
                  </Td>
                )}

                <Td width="10%">
                  <Button
                    size="xs"
                    onClick={() => {
                      addNode(node);
                    }}
                  >
                    <SlTarget></SlTarget>
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default AccordionList;