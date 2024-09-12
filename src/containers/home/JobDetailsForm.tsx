import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "../../components/formComponents/FormInput";
import { IJobDetails } from "../../interface/forms";
import { useData } from "./DataProvider";

const JobDetailsForm: React.FC<any> = ({ handleTabChange }) => {
  const data = useData();
  const setState = data?.setState;
  const state = data?.state;
  const { jobDetails } = state!;

  const handleChangeCustom = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let { name, value } = e.target;
    let tempVal:number = -1;
    if(name === 'noOfOpenings') tempVal = parseInt(value);
    setState!(( prevState ) => ({
      ...prevState,
      jobDetails: {
        ...prevState.jobDetails,
        [name] : tempVal >= 0 ? tempVal : value
      }
    }))
    setFieldValue(name,value);
  };

  const { handleChange, errors, touched, handleBlur, handleSubmit, values, setFieldValue } =
    useFormik<IJobDetails>({
      initialValues: {
        jobTitle: jobDetails.jobTitle,
        jobDetails: jobDetails.jobDetails,
        jobLocation: jobDetails.jobLocation
      },
      validationSchema: Yup.object().shape({
        jobTitle: Yup.string().required("Job Title is required"),
        jobDetails: Yup.string().required("Job Details is required"),
        jobLocation: Yup.string().required("Job Location is required"),
      }),
      onSubmit: (values) => {
        handleTabChange(+1);
      },
    });

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={handleChangeCustom}
          onBlur={handleBlur}
          value={values?.jobTitle}
          error={errors?.jobTitle}
          touched={touched?.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={handleChangeCustom}
          onBlur={handleBlur}
          value={values?.jobDetails}
          error={errors?.jobDetails}
          touched={touched?.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={handleChangeCustom}
          onBlur={handleBlur}
          error={errors.jobLocation}
          touched={touched.jobLocation}
          value={values.jobLocation}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => handleTabChange(-1)}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
