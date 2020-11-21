import * as Yup from "yup";

const requiredString = Yup.string().required("(required)");
const requiredNumber = Yup.number()
  .min(1, "value cannot be zero")
  .required("(required)");
const condRequired = Yup.number()
.min(1, "value cannot be zero").when("typeGroup",{
  is:"LAND",
  then: Yup.number(),
  otherwise:requiredNumber
})
export const propertySchema = Yup.object().shape({
  title: requiredString,
  price:requiredNumber,
  currency:requiredString,
  currentState:requiredString,
  purpose:requiredString,
  type:requiredString,
  typeGroup:requiredString,
  description:Yup.string(),
  details: Yup.object({
    bedrooms: condRequired,
    bathrooms: condRequired,
    toilets: condRequired,
    size: condRequired,
  }),
  address: Yup.object({
    address: requiredString,
    state:requiredString,
    lga:requiredString,
    country:requiredString
  }),
  attachments: Yup.array()
    .min(3, "you must upload at least three images").max(5,"maximum of five images allowed for your current plan, please upgrade ")
    .required("please upload an image, or apartment will be drafted"),
});
