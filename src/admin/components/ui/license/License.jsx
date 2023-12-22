import { ErrorMessage, Field } from "formik";

const License = () => {
    return (
        <div className="form-group">
            <div className="custom-control custom-checkbox">
                <Field type="checkbox" name="isLicenseAccepted" id="login-check" className="custom-control-input" />
                <ErrorMessage name="isLicenseAccepted" component="div" className="invalid-feedback" />
                <label className="custom-control-label" htmlFor="login-check">
                    Accept the license agreement
                </label>
            </div>
        </div>
    );
};

export default License;
