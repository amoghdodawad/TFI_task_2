import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { IRequisitionDetails } from "../../interface/forms";
import { genderOptions, urgencyOptions } from "./constants";
import { useData } from "./DataProvider";

const RequisitionDetailsForm: React.FC<any> = ({ handleTabChange }) => {
  const data = useData();
  const setState = data?.setState;
  const state = data?.state;
  const { requisitionDetails } = state!;

  const handleChangeCustom = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let { name, value } = e.target;
    let tempVal:number = -1;

    if(name === 'noOfOpenings'){
      tempVal = parseInt(value);
      if(Number.isNaN(tempVal)) tempVal = 0;
    }

    setState!(( prevState ) => ({
      ...prevState,
      requisitionDetails: {
        ...prevState.requisitionDetails,
        [name] : tempVal >= 0 ? tempVal : value
      }
    }))
    setFieldValue(name,value);
  };

  const handleSelectChange = (name: string, value: string) => {
    setState!((prevState) => ({
      ...prevState,
      requisitionDetails: {
        ...prevState.requisitionDetails,
        [name]: value
      }
    }));
    setFieldValue(name, value);
  }

  const {
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IRequisitionDetails>({
    initialValues: {
      requisitionTitle: requisitionDetails.requisitionTitle,
      noOfOpenings: requisitionDetails.noOfOpenings,
      urgency: requisitionDetails.urgency,
      gender: requisitionDetails.gender,
    },
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      handleTabChange(+1);
    },
  });

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Requisition Title"
          placeholder="Enter requisition title"
          name="requisitionTitle"
          onChange={handleChangeCustom}
          onBlur={handleBlur}
          value={values?.requisitionTitle}
          error={errors?.requisitionTitle}
          touched={touched?.requisitionTitle}
        />
        <FormInput
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          onChange={handleChangeCustom}
          onBlur={handleBlur}
          value={values?.noOfOpenings}
          error={errors?.noOfOpenings}
          touched={touched?.noOfOpenings}
        />
        <FormSelect
          label="Gender"
          name="gender"
          placeholder="Select gender"
          options={genderOptions}
          onChange={handleSelectChange}
          onBlur={setFieldTouched}
          error={errors.gender}
          touched={touched.gender}
          value={values.gender}
        />
        <FormSelect
          label="Urgency"
          name="urgency"
          placeholder="Select urgency"
          options={urgencyOptions}
          onChange={handleSelectChange}
          // onBlur={setFieldTouched}
          error={errors.urgency}
          touched={touched.urgency}
          value={values.urgency}
        />
        <Flex w="100%" justify="flex-end" mt="4rem">
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequisitionDetailsForm;
