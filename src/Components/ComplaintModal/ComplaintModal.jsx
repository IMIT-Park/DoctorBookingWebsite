import React, { useEffect } from "react";

const ComplaintModal = ({ showModal, handleClose, reportInput, setReportInput, handleComplaintSubmit }) => {
    
    useEffect(() => {
        const toggleBodyOverflow = () => {
            const body = document.querySelector("body");
            if(showModal) {
                body.style.overflow = "hidden";
                body.style.position = "fixed";
            } else {
                body.style.overflow = "auto";
                body.style.position = "relative";
            }
        };

        toggleBodyOverflow();

        return () => {
            document.querySelector("body").style.overflow = "auto";
            document.querySelector("body").style.position = "relative";
        };
    }, [showModal]);
    
    if (!showModal) return null;


    return (
        <>
            {/* Modal backdrop with semi-transparent black */}
            <div className="modal-backdrop fade show"></div> 
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-modal="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header"> 
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleComplaintSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="reportEmail" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="reportEmail"
                                        placeholder="Enter Email"
                                        value={reportInput.email}
                                        onChange={(e) => setReportInput({ ...reportInput, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="reportPhone" className="form-label">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="reportPhone"
                                        placeholder="Enter Your Phone Number"
                                        value={reportInput.phone}
                                        onChange={(e) => setReportInput({ ...reportInput, phone: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="reportContent" className="form-label">Report</label>
                                    <textarea
                                        className="form-control"
                                        id="reportContent"
                                        rows="5"
                                        placeholder="Enter your report content"
                                        value={reportInput.content}
                                        onChange={(e) => setReportInput({ ...reportInput, content: e.target.value })}
                                        required
                                    ></textarea>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-secondary" style={{ backgroundColor: '#006400', borderColor: '#006400' }}>Submit</button>
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose} style={{ backgroundColor: '#006400', borderColor: '#006400' }}>Close</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ComplaintModal;
