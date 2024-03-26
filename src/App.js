import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="form_box">
    <div className="from_containter">
        <div className="form_header">
            <h4 className="text-black font-inter text-3xl"> ←Back</h4>
            <h2 className="text-black font-inter text-4xl font-600"> Make Claim</h2>
        </div>

        <form className="rounded-lg shadow-md form-main mt-3">
            <div className="form-head p-5 flex justify-between items-center">
                <div>
                    <h2 className="text-black font-inter text-3xl font-600">CLAIM APPLICATION</h2>
                    <h2 className="text-black font-inter text-2xl font-600">Employee Name</h2>
                </div>
                <div>
                    <button type="submit" className="btn-submit"> SUBMIT</button>
                </div>
            </div>
            <div className="p-5">
                <div className="flex justify-start items-center flex-warp">
                    <div className="w-50 form-group mb-4 mr-2">
                        <label className="text-shadow-md">Employee ID</label>
                        <input type="text" name="" placeholder="Enter your EmployeeID.." />
                    </div>
                    <div className="w-35 form-group mb-4 euro relative">
                        <label className="text-shadow-md">Claim Amount</label>
                        <input type="text" name=""  placeholder="Enter Amount.." />
                    </div>
                </div>
                <div className="flex justify-start items-center flex-warp">
                    <div className="w-50 form-group mb-4 mr-2">
                        <label className="text-shadow-md"> Type</label>
                        <select>
                            <option>Select from Dropdown..</option>
                            <option>New</option>
                            <option>Senior</option>
                            <option>Hr</option>
                            <option>Old</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-start items-center flex-warp">
                    <div className="w-100 form-group mb-4">
                        <label className="text-shadow-md">Select a file</label>
                        <div className="file-upload-container">
                            <input type="text" className="file-input" placeholder="Choose file..." readOnly />
                            <label htmlFor="file" className="file-upload-btn">Browse</label>
                            <input type="file" id="file" name="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} />
                        </div>
                        <div className="btn-group">
                            <button type="reset" className="btn btn-reset">Reset</button>
                            <button type="submit" className="btn btn-upload">Upload</button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-start items-center flex-warp">
                    <div className="w-100 form-group">
                        <label className="text-shadow-md"> Description</label>
                        <textarea rows="4" placeholder="Enter Claim Description.."></textarea>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
  );
}

export default App;
