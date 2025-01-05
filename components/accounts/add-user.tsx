import React, { useRef, useState } from "react";
import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@nextui-org/react";
import { AiFillDelete, AiOutlinePlusSquare } from "react-icons/ai";
import { array, object, string } from "yup";
import { Formik, useFormikContext } from "formik";
import { showToast } from "@/app/utils/toastUtils";
import { toast, ToastContainer } from "react-toastify";

export const CustomRadio = (props) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between flex-row-reverse max-w-[300px] cursor-pointer border-2 border-default rounded-lg gap-2 p-2 data-[selected=true]:border-primary",
      }}
    >
      {children}
    </Radio>
  );
};

export const AddUser = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [questions, setQuestions] = useState([{ id: Date.now(), text: "" }]);

  const [selected, setSelected] = React.useState("");

  const formRef = useRef(null);

  const handleSubmit = () => {
    console.log(formRef?.current);
    formRef?.current?.handleSubmit();
  };

  const AddJobSchema = object().shape({
    title: string().required("Title is required"),
    description: string().required("Description is required"),
    aiLevel: string().required("Please select a level"),

    questions: array()
      .of(
        object().shape({
          text: string().required("Question is required"),
        })
      )
      .min(1, "At least one question is required"),
  });

  // Add new row
  const handleAddRow = () => {
    setQuestions([...questions, { id: Date.now(), text: "" }]);
  };

  // Remove row
  const handleRemoveRow = (id) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  // Update input value
  const handleInputChange = (id, value) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, text: value } : q))
    );
  };

  return (
    <div>
      <>
        <Button onPress={onOpen} color="primary">
          Add Job
        </Button>
        <Drawer size="4xl" isOpen={isOpen} onOpenChange={onOpenChange}>
          <DrawerContent>
            {(onClose) => (
              <>
                <DrawerHeader className="flex flex-col gap-1">
                  Add Job
                </DrawerHeader>
                <DrawerBody>
                  <Formik
                    innerRef={formRef}
                    initialValues={{
                      title: "",
                      description: "",
                      questions: [{ id: Date.now(), text: "" }],
                      aiLevel: "",
                    }}
                    onSubmit={(values) => console.log(values)}
                    validationSchema={AddJobSchema}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      setFieldValue,
                      handleSubmit,
                      validateForm,
                    }) => (
                      <>
                        <Input
                          label="Title"
                          variant="bordered"
                          value={values.title}
                          isInvalid={!!errors.title && !!touched.title}
                          errorMessage={errors.title}
                          onChange={handleChange("title")}
                        />
                        <Textarea
                          label="Description"
                          variant="bordered"
                          value={values.description}
                          isInvalid={
                            !!errors.description && !!touched.description
                          }
                          errorMessage={errors.description}
                          onChange={handleChange("description")}
                        />

                        <div className="flex">
                          <div className="flex-1 flex">
                            <RadioGroup
                              value={values.aiLevel}
                              onValueChange={(value) =>
                                setFieldValue("aiLevel", value)
                              }
                              orientation="horizontal"
                              isInvalid={!!errors.aiLevel && !!touched.aiLevel}
                              errorMessage={errors.aiLevel}
                              label="Generate question using AI"
                            >
                              <CustomRadio value="beginner">
                                Beginner
                              </CustomRadio>
                              <CustomRadio value="Intermediate">
                                Intermediate
                              </CustomRadio>
                              <CustomRadio value="senior">Senior</CustomRadio>
                              <CustomRadio value="expert">Expert</CustomRadio>
                            </RadioGroup>
                          </div>

                          <div className="flex items-center justify-center">
                            <Button
                              color="danger"
                              variant="flat"
                              onPress={async () => {
                                const errors = await validateForm();

                                // Validate only `title`, `description`, and `aiLevel`
                                if (
                                  !errors.title &&
                                  !errors.description &&
                                  !errors.aiLevel
                                ) {
                                  console.log("Generating questions...");
                                  // Add your generate logic here
                                } else {
                                  showToast.error(
                                    "Job title, description and expert leavel are required"
                                  );
                                }
                              }}
                            >
                              Generate
                            </Button>
                          </div>
                        </div>

                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                          <Table aria-label="Example static collection table">
                            <TableHeader>
                              <TableColumn>#</TableColumn>
                              <TableColumn>QUESTIONS</TableColumn>
                              <TableColumn width={30}>
                                <Button
                                  color="primary"
                                  variant="faded"
                                  onPress={() =>
                                    setFieldValue("questions", [
                                      ...values.questions,
                                      { id: Date.now(), text: "" },
                                    ])
                                  }
                                >
                                  Add <AiOutlinePlusSquare />
                                </Button>
                              </TableColumn>
                            </TableHeader>
                            <TableBody>
                              {values.questions.map((question, index) => (
                                <TableRow key={question.id}>
                                  <TableCell>{index + 1}</TableCell>
                                  <TableCell>
                                    <Input
                                      variant="bordered"
                                      value={question.text}
                                      isInvalid={
                                        !!(
                                          errors.questions?.[index]?.text &&
                                          touched.questions?.[index]?.text
                                        )
                                      }
                                      errorMessage={
                                        errors.questions?.[index]?.text || ""
                                      }
                                      onChange={(e) =>
                                        setFieldValue(
                                          `questions[${index}].text`,
                                          e.target.value
                                        )
                                      }
                                    />
                                  </TableCell>

                                  <TableCell>
                                    <Button
                                      isIconOnly
                                      aria-label="Remove question"
                                      color="warning"
                                      variant="faded"
                                      onPress={() =>
                                        setFieldValue(
                                          "questions",
                                          values.questions.filter(
                                            (q) => q.id !== question.id
                                          )
                                        )
                                      }
                                    >
                                      <AiFillDelete />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </>
                    )}
                  </Formik>
                </DrawerBody>
                <DrawerFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Close
                  </Button>
                  <Button onPress={handleSubmit} color="primary">
                    Save Job
                  </Button>
                </DrawerFooter>
              </>
            )}
          </DrawerContent>
          <ToastContainer />
        </Drawer>
      </>
    </div>
  );
};
