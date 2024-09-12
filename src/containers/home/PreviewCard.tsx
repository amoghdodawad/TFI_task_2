import { Box, Flex, Text, Grid } from "@chakra-ui/react";
import React from "react";
import { useData } from "./DataProvider";
import { urgencyOptions, genderOptions, interviewDurationOptions, interviewLanguageOptions, interviewModeOptions } from "./constants";


function getFormattedUrgencyOption(urgency: string){
  const formattedUrgencyArray = urgencyOptions.filter(option => {
    if(option.value === urgency) return true;
    return false;
  })
  return formattedUrgencyArray.length ? formattedUrgencyArray[0].label : '';
}

function getFormattedGender(gender: string){
  const formattedGenderArray = genderOptions.filter(g => {
    if(g.value === gender) return true;
    return false;
  })
  return formattedGenderArray.length ? formattedGenderArray[0].label : '';
}

function getFormattedLanguage(gender: string){
  const formattedGenderArray = interviewLanguageOptions.filter(g => {
    if(g.value === gender) return true;
    return false;
  })
  return formattedGenderArray.length ? formattedGenderArray[0].label : '';
}

function getFormattedDuration(gender: string){
  const formattedGenderArray = interviewDurationOptions.filter(g => {
    if(g.value === gender) return true;
    return false;
  })
  return formattedGenderArray.length ? formattedGenderArray[0].label : '';
}

function getFormattedMode(gender: string){
  const formattedGenderArray = interviewModeOptions.filter(g => {
    if(g.value === gender) return true;
    return false;
  })
  return formattedGenderArray.length ? formattedGenderArray[0].label : '';
}

const DataCard: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <Box mt="1rem" bg="white" width="100%" p="16px 24px" borderRadius="10px">
      <Text fontSize="1rem" as="h6" fontWeight="600" mb="12px">
        {title}
      </Text>
      <Grid gap="16px" templateColumns="1fr 1fr">
        {children}
      </Grid>
    </Box>
  );
};

const KeyValue: React.FC<{
  title: string;
  value?: string;
}> = ({ title, value }) => {
  return (
    <Box w="100%">
      <Text fontSize=".875rem" color="gray" mb="8px">
        {title}
      </Text>
      <Text fontSize=".875rem" mb="8px">
        {value || "-"}
      </Text>
    </Box>
  );
};

const PreviewCard: React.FC = () => {
  const data = useData();
  const { interviewSettings, jobDetails, requisitionDetails } = data!.state;
  
  return (
    <Box p="1rem">
      <Box borderRadius="10px" bgColor="gray.100" height="fit-content">
        <Flex justifyContent="space-between">
          <Text fontWeight="bold" fontStyle="italic" m="0.4rem 2rem">
            Draft
          </Text>
          <Box
            bgColor="#EE5353"
            color="white"
            p="0.4rem 2rem"
            borderTopRightRadius="10px"
          >
            <Text fontStyle="italic">Preview</Text>
          </Box>
        </Flex>
        <Box w="100%" p="16px 24px">
          <Box
            width="100%"
            bgColor="#432B7D"
            color="white"
            p="1rem"
            borderRadius="10px"
          >
            <Flex
              fontFamily="Poppins"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize="0.9rem" fontWeight="500">
                {requisitionDetails.requisitionTitle}
              </Text>
              <Flex justifyContent="space-around" alignItems="center">
                <Text fontSize="0.8rem" mr="0.4rem" fontWeight="200" as="p">
                  OPENINGS
                </Text>
                <Text fontSize="1rem" fontWeight="bold" as="span">
                  {requisitionDetails.noOfOpenings}
                </Text>
              </Flex>
            </Flex>
          </Box>
        </Box>
        <Box maxH="50rem" overflowY="auto" px="24px" pb="24px">
          <DataCard title="Requisition Details">
            <KeyValue title="Urgency" value={getFormattedUrgencyOption(requisitionDetails.urgency)} />
            <KeyValue title="Gender" value={getFormattedGender(requisitionDetails.gender)} />
          </DataCard>
          <DataCard title="Job Detail">
            <KeyValue title="Job Title" value={jobDetails.jobTitle} />
            <KeyValue title="Job Details" value={jobDetails.jobDetails} />
            <KeyValue title="Job Location" value={jobDetails.jobLocation} />
          </DataCard>
          <DataCard title="Interview Settings">
            <KeyValue title="Interview Duration" value={getFormattedDuration(interviewSettings.interviewDuration)} />
            <KeyValue title="Interview Language" value={getFormattedLanguage(interviewSettings.interviewLanguage)} />
            <KeyValue title="Interview Mode" value={getFormattedMode(interviewSettings.interviewMode)} />
          </DataCard>
        </Box>
      </Box>
    </Box>
  );
};

export default PreviewCard;
