import { ErrorMessage, Field } from "formik";

const License = () => {
    return (
        <div className="admin-form-group">
            <div className="admin-custom-control admin-custom-checkbox">
                <Field type="checkbox" name="isLicenseAccepted" id="login-check" className="admin-custom-control-input" />
                <ErrorMessage name="isLicenseAccepted" component="div" className="admin-invalid-feedback" />
                <label className="admin-custom-control-label" htmlFor="login-check">
                    Accept the license agreement
                </label>
            </div>
        </div>
    );
};

export default License;
