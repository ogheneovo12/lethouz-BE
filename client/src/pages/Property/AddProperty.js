import React, { useEffect, useState } from "react";
import { usePropertyDispatch, uploadProperty, usePropertyState, updateProperty } from "../../contexts";
import { PROPERTY_REQUEST_ERROR } from "../../constants";
import { DropDown, Upload, Spinner, useQuery } from "../../components";
import { Form, Formik, Field, useFormikContext } from "formik";
import cx from "classname";
import { propertySchema } from "./PropertySchema";
import _ from "lodash";
import { stateJson } from "./json/state";
import { countries } from "./json/countries";
import { purpose  } from "./json/static";
import { formatTypesToDropDown, getSubType } from "./json/types";
import { history } from "../../helpers";

//this component doesnt render anything but just
//updates attachment field
function UpdateAttach({ previews }) {
  const { setFieldValue } = useFormikContext();
  React.useEffect(() => {
    setFieldValue(
      "attachments",
      previews.filter((v) => !v.isInvalid),
      true
    );
  }, [previews,setFieldValue]);
  return null;
}

function AddProperty({match}) {
  const [loading, setLoading] = useState(false);
  const propertyDispatch = usePropertyDispatch();
  const [previews, setPreviews] = useState([]);
  let states = stateJson.map((sta) => {
    const tempState = sta[Object.keys(sta)[0]];
    return { label: tempState, value: tempState };
  });
  const { uploaded } = usePropertyState()
  const [uploadedToedit, setUploadedToEdit] = useState(null);
  let query = useQuery();
  const tag = query.get("tag");
  const id = query.get("id");
  useEffect(()=>{
    if(tag === "edit"){
      const toBedited = uploaded.find(({_id})=>_id === id);
      if(!toBedited){
        history.push(`${match.path}?tag=new`)
        return alert("property to be editted does not exist, create new instead");
      }
      //convert attachment to preview format
      let newAttachments = toBedited.attachments.map(link=>({src:link}))
      setPreviews(newAttachments);
      setUploadedToEdit(toBedited);
    }
  },[tag,id,uploaded,match.path])
  

  //validate and set attachments

  return (
    <div className="add_property">
      <hgroup>
        <h2>Upload your Apartment</h2>
        <p>Upload your house in front of millions of home seekers</p>
      </hgroup>
      <Formik
        enableReinitialize
        onI
        initialValues={uploadedToedit ? uploadedToedit : {
          title: "",
          purpose: "", //sync with default option
          type: "",
          typeGroup:"",
          price: 0.0,
          currency:"Naira",
          currentState: "new",
          description: "",
          details: {
            bedrooms: 1,
            bathrooms: 1,
            toilets: 1,
            size: 1,
          },
          address: {
            address: "",
            state: "",
            lga: "",
            country:""
          },
          attachments: [],
        }}
        onSubmit={(values, { setErrors }) => {
          //server doesnt take number
         for (let key in values.details) {
           values.details[key] = String(values.details[key]);
         }
          const { typeGroup,...filteredValues}  = values;
          if(uploadedToedit){
            return updateProperty(propertyDispatch,id,filteredValues,setLoading,setErrors) 
          }
          uploadProperty(propertyDispatch, filteredValues, setLoading, setErrors);
        }}
        validationSchema={propertySchema}
      >
        {({ errors, touched, values, setFieldValue }) => {
          function getLga() {
            const pickedState = stateJson.filter((currState) => {
              if (
                currState.state.toLowerCase() ===
                values.address.state.toLowerCase()
              ) {
                return true;
              }
              return false;
            });
            if (pickedState[0]) {
              return pickedState[0].lgas.map((lga) => ({
                label: lga,
                value: lga,
              }));
            }
            return [];
          }

          function setAttachments(attachments) {
            setFieldValue();
            return setPreviews((prev) => {
              const newArr = [...prev, attachments];
              return newArr;
            });
          }

          return (
            <Form>
              <section>
                <div className="form-control inline title">
                  <label htmlFor="title">Title</label>
                  <Field
                    type="text"
                    name="title"
                    className={cx(
                      errors.title && touched.title && "input-error"
                    )}
                  />
                </div>
                <DropDown
                  onChange={(picked) => {
                    setFieldValue(picked.name, picked.value);
                  }}
                  value={values.purpose}
                  data={purpose}
                  title="purpose"
                  name="purpose"
                  isInvalid={Boolean(errors.purpose && touched.purpose)}
                />

                <DropDown
                  onChange={(picked) => {
                    setFieldValue(picked.name, picked.value);
                  }}
                  title="type of house"
                  data={formatTypesToDropDown()}
                  value={values.typeGroup}
                  name="typeGroup"
                  isInvalid={Boolean(errors.typeGroup && touched.typeGroup)}
                />
                 <DropDown
                  onChange={(picked) => {
                    setFieldValue(picked.name, picked.value);
                  }}
                  title="subtype"
                  data={getSubType(values.typeGroup)}
                  value={values.type}
                  defaultMessage="pick a type first"
                  name="type"
                  isInvalid={Boolean(errors.type && touched.type)}
                  scroll
                />
                { values.typeGroup !== "LAND" &&
                  <>
                <div className="form-control inline  number">
                  <label htmlFor="title">Bedroom</label>
                  <Field
                    type="number"
                    name="details.bedrooms"
                    min={1}
                    className={cx(
                      errors.details &&
                        errors.details.bedrooms &&
                        touched.details &&
                        touched.details.bedrooms &&
                        "input-error"
                    )}
                  />
                </div>
                <div className="form-control inline  number">
                  <label htmlFor="title">Bathroom</label>
                  <Field
                    type="number"
                    min={1}
                    name="details.bathrooms"
                    className={cx(
                      errors.details &&
                        errors.details.bathrooms &&
                        touched.details &&
                        touched.details.bathrooms &&
                        "input-error"
                    )}
                  />
                </div>
                <div className="form-control inline  number">
                  <label htmlFor="title">Toilet</label>
                  <Field
                    type="number"
                    min={1}
                    name="details.toilets"
                    className={cx(
                      errors.details &&
                        errors.details.toilets &&
                        touched.details &&
                        touched.details.toilets &&
                        "input-error"
                    )}
                  />
                </div>
                </>
        }
                <div className="form-control inline  ">
                  <label htmlFor="title">Size of house</label>
                  <Field
                    type="number"
                    min={1}
                    name="details.size"
                    className={cx(
                      errors.details &&
                        errors.details.size &&
                        touched.details &&
                        touched.details.size &&
                        "input-error","isi"
                    )}
                  />
                  <label className="lsi">sqm</label>
                </div>
                <div className="form-group inline">
                  <div className="form-control">
                    <Field type="radio" name="currentState" value="serviced" />
                    <label>serviced</label>
                  </div>
                  <div className="form-control">
                    <Field type="radio" name="currentState" value="furnished" />
                    <label>furnished</label>
                  </div>
                  <div className="form-control">
                    <Field
                      type="radio"
                      name="currentState"
                      value="new"
                    />
                    <label>newly built</label>
                  </div>
                </div>
              </section>

              <section>
                <p>choose a state to see available lga first</p>
                <DropDown
                  onChange={(picked) => {
                    setFieldValue(picked.name, picked.value);
                  }}
                  type="full"
                  title="Country"
                  value={values.address.country}
                  data={countries}
                  name="address.country"
                  isInvalid={Boolean(
                    errors.address &&
                      errors.address.country &&
                      touched.address &&
                      touched.address.country
                  )}
                  scroll
                />
                <DropDown
                  onChange={(picked) => {
                    setFieldValue(picked.name, picked.value);
                  }}
                  type="medium"
                  title="State"
                  value={values.address.state}
                  data={states}
                  name="address.state"
                  isInvalid={Boolean(
                    errors.address &&
                      errors.address.state &&
                      touched.address &&
                      touched.address.state
                  )}
                  scroll
                />
                <DropDown
                  onChange={(picked) => {
                    setFieldValue(picked.name, picked.value);
                  }}
                  title="L.G.A"
                  value={values.address.lga}
                  data={getLga()}
                  name="address.lga"
                  defaultMessage=" choose a state first"
                  isInvalid={Boolean(
                    errors.address &&
                      errors.address.lga &&
                      touched.address &&
                      touched.address.lga
                  )}
                  scroll
                />
                <div className="form-control inline" style={{ width: "90%" }}>
                  <label htmlFor="title">Street/road</label>
                  <Field
                    type="text"
                    style={{ background: "rgb(247, 247, 250)" }}
                    name="address.address"
                    className={cx(
                      errors.address &&
                        errors.address.address &&
                        touched.address &&
                        touched.address.address &&
                        "input-error"
                    )}
                  />
                </div>
              </section>

              <section>
              <DropDown 
                  title="currency"
                  onChange ={(picked) => {
                    setFieldValue(picked.name, picked.value);
                  }}
                  value="naira"
                  name="currency"
                  data={[{value:"naira",label:"naira ₦"},{value:"dollars",label:"dollars $"}]}
                   isInvalid={
                     touched.currency && errors.currency
                   }
                  />
                <div className="form-control inline">
                  <label htmlFor="price">price</label>
                  <Field
                    type="number"
                    id="price"
                    name="price"
                    className={cx(
                      errors.price && touched.price && "input-error"
                    )}
                  />
                </div>
                <div className="form-control inline" style={{ width: "90%" }}>
                  <label htmlFor="title">description</label>
                  <Field
                    as="textarea"
                    rows={14}
                    className="texta"
                    name="description"
                    
                  />
                </div>
              </section>

              <section>
                <p style={{color:"red", fontSize:14}}>{errors.attachments}</p>
                <UpdateAttach previews={previews} />
                <Upload
                  previews={previews}
                  setPreview={setAttachments}
                  onRemove={setPreviews}
                />
              </section>

              <div className="action">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={()=>{
                    if(!_.isEmpty(errors))handleError("there are missing field, please check");
                  }}
                >
                  {loading ? <Spinner /> : <span>upload</span>}
                </button>
                <button className="btn-ghost">save as draft</button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );

  function handleError(message) {
    propertyDispatch({ type: PROPERTY_REQUEST_ERROR, payload: message });
  }
}

AddProperty.propTypes = {};

export default AddProperty;
