import React, { useState } from 'react';
import { useAppDispatch } from './../hooks/useAppDispatch';
import { useAppSelector } from './../hooks/useAppSelector';
import { updateMe } from '../redux/updateMeSlice';

interface UpdateMePayload {
    username: string;
    email: string;
    phoneNumber: string;
    country: string;
}

const UpdateMeForm: React.FC = () => {
  // ✅ Using a single state object for all input fields
  const [userDetails, setUserDetails] = useState<UpdateMePayload>({
    username: '',
    email: '',
    phoneNumber: '',
    country: '',
  });

  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.updateMe); // ✅ Ensure `loading` exists

  // ✅ Handle input changes dynamically
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validate required fields
    if (!userDetails.username || !userDetails.email || !userDetails.phoneNumber || !userDetails.country) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await dispatch(updateMe(userDetails)).unwrap();
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={userDetails.username}
          onChange={handleChange}
          required
          placeholder="Username"
        />
        <input
          type="email"
          name="email"
          value={userDetails.email}
          onChange={handleChange}
          required
          placeholder="Email"
        />
        <input
          type="tel"
          name="phoneNumber"
          value={userDetails.phoneNumber}
          onChange={handleChange}
          required
          placeholder="Phone Number"
        />
        <input
          type="text"
          name="country"
          value={userDetails.country}
          onChange={handleChange}
          required
          placeholder="Country"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default UpdateMeForm;
10:06:23 AM: build-image version: 6724b7f630462a3bda7629c0c4b9c485399606e3 (focal)
10:06:23 AM: buildbot version: 927e75ede366e8085d4e00cdba5fd6dcec09e3f4
10:06:23 AM: Fetching cached dependencies
10:06:23 AM: Starting to download cache of 223.2MB
10:06:25 AM: Finished downloading cache in 1.678s
10:06:25 AM: Starting to extract cache
10:06:29 AM: Finished extracting cache in 4.408s
10:06:29 AM: Finished fetching cache in 6.145s
10:06:29 AM: Starting to prepare the repo for build
10:06:29 AM: Preparing Git Reference refs/heads/master
10:06:31 AM: Starting to install dependencies
10:06:32 AM: Started restoring cached mise cache
10:06:32 AM: Finished restoring cached mise cache
10:06:33 AM: mise python@3.13.1   install
10:06:33 AM: mise python@3.13.1   download cpython-3.13.1+20250115-x86_64-unknown-linux-gnu-install_only_stripped.tar.gz
10:06:33 AM: mise python@3.13.1   extract cpython-3.13.1+20250115-x86_64-unknown-linux-gnu-install_only_stripped.tar.gz
10:06:33 AM: mise python@3.13.1   python --version
10:06:33 AM: mise python@3.13.1   Python 3.13.1
10:06:33 AM: mise python@3.13.1 ✓ installed
10:06:33 AM: Python version set to 3.13
10:06:35 AM: Collecting pipenv
10:06:35 AM:   Downloading pipenv-2024.4.1-py3-none-any.whl.metadata (17 kB)
10:06:35 AM: Collecting certifi (from pipenv)
10:06:35 AM:   Downloading certifi-2024.12.14-py3-none-any.whl.metadata (2.3 kB)
10:06:35 AM: Collecting packaging>=22 (from pipenv)
10:06:35 AM:   Downloading packaging-24.2-py3-none-any.whl.metadata (3.2 kB)
10:06:35 AM: Collecting setuptools>=67 (from pipenv)
10:06:35 AM:   Downloading setuptools-75.8.0-py3-none-any.whl.metadata (6.7 kB)
10:06:35 AM: Collecting virtualenv>=20.24.2 (from pipenv)
10:06:35 AM:   Downloading virtualenv-20.29.1-py3-none-any.whl.metadata (4.5 kB)
10:06:35 AM: Collecting distlib<1,>=0.3.7 (from virtualenv>=20.24.2->pipenv)
10:06:35 AM:   Downloading distlib-0.3.9-py2.py3-none-any.whl.metadata (5.2 kB)
10:06:35 AM: Collecting filelock<4,>=3.12.2 (from virtualenv>=20.24.2->pipenv)
10:06:35 AM:   Downloading filelock-3.17.0-py3-none-any.whl.metadata (2.9 kB)
10:06:35 AM: Collecting platformdirs<5,>=3.9.1 (from virtualenv>=20.24.2->pipenv)
10:06:35 AM:   Downloading platformdirs-4.3.6-py3-none-any.whl.metadata (11 kB)
10:06:35 AM: Downloading pipenv-2024.4.1-py3-none-any.whl (3.0 MB)
10:06:36 AM:    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 3.0/3.0 MB 50.4 MB/s eta 0:00:00
10:06:36 AM: Downloading packaging-24.2-py3-none-any.whl (65 kB)
10:06:36 AM: Downloading setuptools-75.8.0-py3-none-any.whl (1.2 MB)
10:06:36 AM:    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 1.2/1.2 MB 12.8 MB/s eta 0:00:00
10:06:36 AM: Downloading virtualenv-20.29.1-py3-none-any.whl (4.3 MB)
10:06:36 AM:    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 4.3/4.3 MB 51.5 MB/s eta 0:00:00
10:06:36 AM: Downloading certifi-2024.12.14-py3-none-any.whl (164 kB)
10:06:36 AM: Downloading distlib-0.3.9-py2.py3-none-any.whl (468 kB)
10:06:36 AM: Downloading filelock-3.17.0-py3-none-any.whl (16 kB)
10:06:36 AM: Downloading platformdirs-4.3.6-py3-none-any.whl (18 kB)
10:06:36 AM: Installing collected packages: distlib, setuptools, platformdirs, packaging, filelock, certifi, virtualenv, pipenv
10:06:38 AM: Successfully installed certifi-2024.12.14 distlib-0.3.9 filelock-3.17.0 packaging-24.2 pipenv-2024.4.1 platformdirs-4.3.6 setuptools-75.8.0 virtualenv-20.29.1
10:06:38 AM: [notice] A new release of pip is available: 24.3.1 -> 25.0
10:06:38 AM: [notice] To update, run: pip install --upgrade pip
10:06:39 AM: Attempting Ruby version 2.7.2, read from environment
10:06:40 AM: Using Ruby version 2.7.2
10:06:40 AM: Started restoring cached go cache
10:06:40 AM: Finished restoring cached go cache
10:06:41 AM: go version go1.19.13 linux/amd64
10:06:42 AM: Using PHP version 8.0
10:06:44 AM: Started restoring cached Node.js version
10:06:45 AM: Finished restoring cached Node.js version
10:06:46 AM: v18.20.6 is already installed.
10:06:46 AM: Now using node v18.20.6 (npm v10.8.2)
10:06:46 AM: Enabling Node.js Corepack
10:06:46 AM: Started restoring cached build plugins
10:06:46 AM: Finished restoring cached build plugins
10:06:46 AM: Started restoring cached corepack dependencies
10:06:46 AM: Finished restoring cached corepack dependencies
10:06:46 AM: No npm workspaces detected
10:06:46 AM: Started restoring cached node modules
10:06:46 AM: Finished restoring cached node modules
10:06:46 AM: Installing npm packages using npm version 10.8.2
10:06:47 AM: npm warn EBADENGINE Unsupported engine {
10:06:47 AM: npm warn EBADENGINE   package: 'react-router@7.0.2',
10:06:47 AM: npm warn EBADENGINE   required: { node: '>=20.0.0' },
10:06:47 AM: npm warn EBADENGINE   current: { node: 'v18.20.6', npm: '10.8.2' }
10:06:47 AM: npm warn EBADENGINE }
10:06:47 AM: npm warn EBADENGINE Unsupported engine {
10:06:47 AM: npm warn EBADENGINE   package: 'react-router-dom@7.0.2',
10:06:47 AM: npm warn EBADENGINE   required: { node: '>=20.0.0' },
10:06:47 AM: npm warn EBADENGINE   current: { node: 'v18.20.6', npm: '10.8.2' }
10:06:47 AM: npm warn EBADENGINE }
10:06:47 AM: changed 4 packages, and audited 443 packages in 900ms
10:06:47 AM: 104 packages are looking for funding
10:06:47 AM:   run `npm fund` for details
10:06:47 AM: found 0 vulnerabilities
10:06:47 AM: npm packages installed
10:06:48 AM: Successfully installed dependencies
10:06:48 AM: Starting build script
10:06:49 AM: Detected 1 framework(s)
10:06:49 AM: "vite" at version "6.0.11"
10:06:49 AM: Section completed: initializing
10:06:51 AM: ​
10:06:51 AM: Netlify Build                                                 
10:06:51 AM: ────────────────────────────────────────────────────────────────
10:06:51 AM: ​
10:06:51 AM: ❯ Version
10:06:51 AM:   @netlify/build 29.58.8
10:06:51 AM: ​
10:06:51 AM: ❯ Flags
10:06:51 AM:   accountId: 63b1a49adadcbd0e45941709
10:06:51 AM:   baseRelDir: true
10:06:51 AM:   buildId: 679b4100a8399d0008916414
10:06:51 AM:   deployId: 679b4100a8399d0008916416
10:06:51 AM: ​
10:06:51 AM: ❯ Current directory
10:06:51 AM:   /opt/build/repo
10:06:51 AM: ​
10:06:51 AM: ❯ Config file
10:06:51 AM:   No config file was defined: using default values.
10:06:51 AM: ​
10:06:51 AM: ❯ Context
10:06:51 AM:   production
10:06:51 AM: ​
10:06:51 AM: Build command from Netlify app                                
10:06:51 AM: ────────────────────────────────────────────────────────────────
10:06:51 AM: ​
10:06:51 AM: $ npm run build
10:06:51 AM: > airing-creditors-frontend@0.0.0 build
10:06:51 AM: > tsc -b && vite build
10:06:53 AM: src/components/resetPassword.tsx(10,1): error TS6133: 'useParams' is declared but its value is never read.
10:06:53 AM: src/components/resetPassword.tsx(27,53): error TS2304: Cannot find name 'useAppSelector'.
10:06:53 AM: src/components/resetPassword.tsx(27,69): error TS7006: Parameter 'state' implicitly has an 'any' type.
10:06:53 AM: src/protectedRoutes/updateMeForm.tsx(10,5): error TS2353: Object literal may only specify known properties, and 'username' does not exist in type 'UpdateMePayload | (() => UpdateMePayload)'.
10:06:53 AM: src/protectedRoutes/updateMeForm.tsx(32,22): error TS2339: Property 'username' does not exist on type 'UpdateMePayload'.
10:06:53 AM: src/protectedRoutes/updateMeForm.tsx(32,47): error TS2339: Property 'email' does not exist on type 'UpdateMePayload'.
10:06:53 AM: src/protectedRoutes/updateMeForm.tsx(32,69): error TS2339: Property 'phoneNumber' does not exist on type 'UpdateMePayload'.
10:06:53 AM: src/protectedRoutes/updateMeForm.tsx(32,97): error TS2339: Property 'country' does not exist on type 'UpdateMePayload'.
10:06:53 AM: src/protectedRoutes/updateMeForm.tsx(53,30): error TS2339: Property 'username' does not exist on type 'UpdateMePayload'.
10:06:53 AM: src/protectedRoutes/updateMeForm.tsx(61,30): error TS2339: Property 'email' does not exist on type 'UpdateMePayload'.
10:06:53 AM: src/protectedRoutes/updateMeForm.tsx(69,30): error TS2339: Property 'phoneNumber' does not exist on type 'UpdateMePayload'.
10:06:53 AM: src/protectedRoutes/updateMeForm.tsx(77,30): error TS2339: Property 'country' does not exist on type 'UpdateMePayload'.
10:06:53 AM: src/redux/loggedInUserSlice.ts(42,75): error TS2304: Cannot find name 'FetchUserResponse'.
10:06:53 AM: src/redux/paymentSlice.ts(44,8): error TS2769: No overload matches this call.
10:06:53 AM:   Overload 1 of 2, '(actionCreator: AsyncThunkFulfilledActionCreator<PaymentResponse, PaymentPayload, { rejectValue: string; state: { auth: AuthState; payment: PaymentState; user: UserState; userProfile: UserState; updateMe: UserState; }; ... 5 more ...; rejectedMeta?: unknown; }>, reducer: CaseReducer<...>): ActionReducerMapBuilder<...>', gave the following error.
10:06:53 AM:     Argument of type '(state: WritableDraft<PaymentState>, action: { payload: PaymentResponse; type: string; }) => void' is not assignable to parameter of type 'CaseReducer<PaymentState, PayloadAction<PaymentResponse, string, { arg: PaymentPayload; requestId: string; requestStatus: "fulfilled"; }, never>>'.
10:06:53 AM:       Types of parameters 'action' and 'action' are incompatible.
10:06:53 AM:         Type 'PayloadAction<PaymentResponse, string, { arg: PaymentPayload; requestId: string; requestStatus: "fulfilled"; }, never>' is not assignable to type '{ payload: PaymentResponse; type: string; }'.
10:06:53 AM:           Types of property 'payload' are incompatible.
10:06:53 AM:             Type 'PaymentResponse' is missing the following properties from type 'PaymentResponse': details, methodName, requestId, complete, and 5 more.
10:06:53 AM:   Overload 2 of 2, '(type: string, reducer: CaseReducer<PaymentState, { payload: PaymentResponse; type: string; }>): ActionReducerMapBuilder<PaymentState>', gave the following error.
10:06:53 AM:     Argument of type 'AsyncThunkFulfilledActionCreator<PaymentResponse, PaymentPayload, { rejectValue: string; state: { auth: AuthState; payment: PaymentState; user: UserState; userProfile: UserState; updateMe: UserState; }; ... 5 more ...; rejectedMeta?: unknown; }>' is not assignable to parameter of type 'string'.
10:06:53 AM: src/redux/paymentSlice.ts(47,46): error TS2339: Property 'transactionId' does not exist on type 'PaymentResponse'.
10:06:53 AM: src/redux/paymentSlice.ts(48,44): error TS2339: Property 'phoneNumber' does not exist on type 'PaymentResponse'.
10:06:53 AM: src/redux/paymentSlice.ts(49,39): error TS2339: Property 'amount' does not exist on type 'PaymentResponse'.
10:06:53 AM: src/redux/paymentSlice.ts(50,39): error TS2339: Property 'status' does not exist on type 'PaymentResponse'.
10:06:53 AM: src/redux/paymentSlice.ts(62,8): error TS2769: No overload matches this call.
10:06:53 AM:   Overload 1 of 2, '(actionCreator: AsyncThunkFulfilledActionCreator<VerifyPaymentResponse, VerifyPaymentPayload, { rejectValue: string; state: { auth: AuthState; payment: PaymentState; user: UserState; userProfile: UserState; updateMe: UserState; }; ... 5 more ...; rejectedMeta?: unknown; }>, reducer: CaseReducer<...>): ActionReducerMapBuilder<...>', gave the following error.
10:06:53 AM:     Argument of type '(state: WritableDraft<PaymentState>, action: { payload: VerifyPaymentResponse; type: string; }) => void' is not assignable to parameter of type 'CaseReducer<PaymentState, PayloadAction<VerifyPaymentResponse, string, { arg: VerifyPaymentPayload; requestId: string; requestStatus: "fulfilled"; }, never>>'.
10:06:53 AM:       Types of parameters 'action' and 'action' are incompatible.
10:06:53 AM:         Type 'PayloadAction<VerifyPaymentResponse, string, { arg: VerifyPaymentPayload; requestId: string; requestStatus: "fulfilled"; }, never>' is not assignable to type '{ payload: VerifyPaymentResponse; type: string; }'.
10:06:53 AM:           Types of property 'payload' are incompatible.
10:06:53 AM:             Type 'VerifyPaymentResponse' is missing the following properties from type 'VerifyPaymentResponse': status, date
10:06:53 AM:   Overload 2 of 2, '(type: string, reducer: CaseReducer<PaymentState, { payload: VerifyPaymentResponse; type: string; }>): ActionReducerMapBuilder<PaymentState>', gave the following error.
10:06:53 AM:     Argument of type 'AsyncThunkFulfilledActionCreator<VerifyPaymentResponse, VerifyPaymentPayload, { rejectValue: string; state: { auth: AuthState; payment: PaymentState; user: UserState; userProfile: UserState; updateMe: UserState; }; ... 5 more ...; rejectedMeta?: unknown; }>' is not assignable to parameter of type 'string'.
10:06:53 AM: ​
10:06:53 AM: "build.command" failed                                        
10:06:53 AM: ────────────────────────────────────────────────────────────────
10:06:53 AM: ​
10:06:53 AM:   Error message
10:06:53 AM:   Command failed with exit code 2: npm run build (https://ntl.fyi/exit-code-2)
10:06:53 AM: ​
10:06:53 AM:   Error location
10:06:53 AM:   In Build command from Netlify app:
10:06:53 AM:   npm run build
10:06:53 AM: ​
10:06:53 AM:   Resolved config
10:06:53 AM:   build:
10:06:53 AM:     command: npm run build
10:06:53 AM:     commandOrigin: ui
10:06:53 AM:     publish: /opt/build/repo/dist
10:06:53 AM:     publishOrigin: ui
10:06:54 AM: Failed during stage 'building site': Build script returned non-zero exit code: 2 (https://ntl.fyi/exit-code-2)
10:06:54 AM: Build failed due to a user error: Build script returned non-zero exit code: 2
10:06:54 AM: Failing build: Failed to build site
10:06:54 AM: Finished processing build request in 31.335s
