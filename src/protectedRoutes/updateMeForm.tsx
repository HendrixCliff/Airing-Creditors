import React, { useState } from 'react';
import { useAppDispatch } from './../hooks/useAppDispatch';
import { useAppSelector } from './../hooks/useAppSelector';
import { updateMe } from './../redux/updateMeSlice';


const UpdateMeForm: React.FC = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');

  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.updateMe); // ✅ Ensure `loading` exists

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !phoneNumber || !country) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await dispatch(updateMe({ userDetails: { username, email, phoneNumber, country } })).unwrap();
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
        <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} required placeholder="Username" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" />
        <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required placeholder="Phone Number" />
        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required placeholder="Country" />
        <button type="submit" disabled={loading}>{loading ? 'Updating...' : 'Update'}</button>
      </form>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};



export default UpdateMeForm;
7:28:06 AM: build-image version: 6724b7f630462a3bda7629c0c4b9c485399606e3 (focal)
7:28:06 AM: buildbot version: 927e75ede366e8085d4e00cdba5fd6dcec09e3f4
7:28:06 AM: Fetching cached dependencies
7:28:06 AM: Starting to download cache of 223.2MB
7:28:08 AM: Finished downloading cache in 2.3s
7:28:08 AM: Starting to extract cache
7:28:12 AM: Finished extracting cache in 3.683s
7:28:12 AM: Finished fetching cache in 6.053s
7:28:12 AM: Starting to prepare the repo for build
7:28:13 AM: Preparing Git Reference refs/heads/master
7:28:14 AM: Starting to install dependencies
7:28:15 AM: Started restoring cached mise cache
7:28:15 AM: Finished restoring cached mise cache
7:28:17 AM: mise python@3.13.1   install
7:28:17 AM: mise python@3.13.1   download cpython-3.13.1+20250115-x86_64-unknown-linux-gnu-install_only_stripped.tar.gz
7:28:17 AM: mise python@3.13.1   extract cpython-3.13.1+20250115-x86_64-unknown-linux-gnu-install_only_stripped.tar.gz
7:28:18 AM: mise python@3.13.1   python --version
7:28:18 AM: mise python@3.13.1   Python 3.13.1
7:28:18 AM: mise python@3.13.1 ✓ installed
7:28:18 AM: Python version set to 3.13
7:28:21 AM: Collecting pipenv
7:28:21 AM:   Downloading pipenv-2024.4.1-py3-none-any.whl.metadata (17 kB)
7:28:21 AM: Collecting certifi (from pipenv)
7:28:21 AM:   Downloading certifi-2024.12.14-py3-none-any.whl.metadata (2.3 kB)
7:28:21 AM: Collecting packaging>=22 (from pipenv)
7:28:21 AM:   Downloading packaging-24.2-py3-none-any.whl.metadata (3.2 kB)
7:28:21 AM: Collecting setuptools>=67 (from pipenv)
7:28:21 AM:   Downloading setuptools-75.8.0-py3-none-any.whl.metadata (6.7 kB)
7:28:21 AM: Collecting virtualenv>=20.24.2 (from pipenv)
7:28:21 AM:   Downloading virtualenv-20.29.1-py3-none-any.whl.metadata (4.5 kB)
7:28:22 AM: Collecting distlib<1,>=0.3.7 (from virtualenv>=20.24.2->pipenv)
7:28:22 AM:   Downloading distlib-0.3.9-py2.py3-none-any.whl.metadata (5.2 kB)
7:28:22 AM: Collecting filelock<4,>=3.12.2 (from virtualenv>=20.24.2->pipenv)
7:28:22 AM:   Downloading filelock-3.17.0-py3-none-any.whl.metadata (2.9 kB)
7:28:22 AM: Collecting platformdirs<5,>=3.9.1 (from virtualenv>=20.24.2->pipenv)
7:28:22 AM:   Downloading platformdirs-4.3.6-py3-none-any.whl.metadata (11 kB)
7:28:22 AM: Downloading pipenv-2024.4.1-py3-none-any.whl (3.0 MB)
7:28:22 AM:    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 3.0/3.0 MB 22.0 MB/s eta 0:00:00
7:28:22 AM: Downloading packaging-24.2-py3-none-any.whl (65 kB)
7:28:22 AM: Downloading setuptools-75.8.0-py3-none-any.whl (1.2 MB)
7:28:22 AM:    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 1.2/1.2 MB 13.6 MB/s eta 0:00:00
7:28:22 AM: Downloading virtualenv-20.29.1-py3-none-any.whl (4.3 MB)
7:28:22 AM:    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 4.3/4.3 MB 98.1 MB/s eta 0:00:00
7:28:22 AM: Downloading certifi-2024.12.14-py3-none-any.whl (164 kB)
7:28:22 AM: Downloading distlib-0.3.9-py2.py3-none-any.whl (468 kB)
7:28:22 AM: Downloading filelock-3.17.0-py3-none-any.whl (16 kB)
7:28:22 AM: Downloading platformdirs-4.3.6-py3-none-any.whl (18 kB)
7:28:23 AM: Installing collected packages: distlib, setuptools, platformdirs, packaging, filelock, certifi, virtualenv, pipenv
7:28:28 AM: Successfully installed certifi-2024.12.14 distlib-0.3.9 filelock-3.17.0 packaging-24.2 pipenv-2024.4.1 platformdirs-4.3.6 setuptools-75.8.0 virtualenv-20.29.1
7:28:28 AM: [notice] A new release of pip is available: 24.3.1 -> 25.0
7:28:28 AM: [notice] To update, run: pip install --upgrade pip
7:28:28 AM: Attempting Ruby version 2.7.2, read from environment
7:28:29 AM: Using Ruby version 2.7.2
7:28:29 AM: Started restoring cached go cache
7:28:29 AM: Finished restoring cached go cache
7:28:31 AM: go version go1.19.13 linux/amd64
7:28:32 AM: Using PHP version 8.0
7:28:33 AM: Started restoring cached Node.js version
7:28:35 AM: Finished restoring cached Node.js version
7:28:35 AM: v18.20.6 is already installed.
7:28:35 AM: Now using node v18.20.6 (npm v10.8.2)
7:28:35 AM: Enabling Node.js Corepack
7:28:35 AM: Started restoring cached build plugins
7:28:35 AM: Finished restoring cached build plugins
7:28:35 AM: Started restoring cached corepack dependencies
7:28:35 AM: Finished restoring cached corepack dependencies
7:28:35 AM: No npm workspaces detected
7:28:35 AM: Started restoring cached node modules
7:28:35 AM: Finished restoring cached node modules
7:28:35 AM: Installing npm packages using npm version 10.8.2
7:28:36 AM: npm warn EBADENGINE Unsupported engine {
7:28:36 AM: npm warn EBADENGINE   package: 'react-router@7.0.2',
7:28:36 AM: npm warn EBADENGINE   required: { node: '>=20.0.0' },
7:28:36 AM: npm warn EBADENGINE   current: { node: 'v18.20.6', npm: '10.8.2' }
7:28:36 AM: npm warn EBADENGINE }
7:28:36 AM: npm warn EBADENGINE Unsupported engine {
7:28:36 AM: npm warn EBADENGINE   package: 'react-router-dom@7.0.2',
7:28:36 AM: npm warn EBADENGINE   required: { node: '>=20.0.0' },
7:28:36 AM: npm warn EBADENGINE   current: { node: 'v18.20.6', npm: '10.8.2' }
7:28:36 AM: npm warn EBADENGINE }
7:28:36 AM: changed 1 package, and audited 443 packages in 990ms
7:28:36 AM: 104 packages are looking for funding
7:28:36 AM:   run `npm fund` for details
7:28:36 AM: 1 moderate severity vulnerability
7:28:36 AM: To address all issues, run:
7:28:36 AM:   npm audit fix
7:28:36 AM: Run `npm audit` for details.
7:28:36 AM: npm packages installed
7:28:37 AM: Successfully installed dependencies
7:28:37 AM: Starting build script
7:28:38 AM: Detected 1 framework(s)
7:28:38 AM: "vite" at version "6.0.3"
7:28:38 AM: Section completed: initializing
7:28:39 AM: ​
7:28:39 AM: Netlify Build                                                 
7:28:39 AM: ────────────────────────────────────────────────────────────────
7:28:39 AM: ​
7:28:39 AM: ❯ Version
7:28:39 AM:   @netlify/build 29.58.8
7:28:39 AM: ​
7:28:39 AM: ❯ Flags
7:28:39 AM:   accountId: 63b1a49adadcbd0e45941709
7:28:39 AM:   baseRelDir: true
7:28:39 AM:   buildId: 679b1beafd69f90008b0d8d2
7:28:39 AM:   deployId: 679b1beafd69f90008b0d8d4
7:28:40 AM: ​
7:28:40 AM: ❯ Current directory
7:28:40 AM:   /opt/build/repo
7:28:40 AM: ​
7:28:40 AM: ❯ Config file
7:28:40 AM:   No config file was defined: using default values.
7:28:40 AM: ​
7:28:40 AM: ❯ Context
7:28:40 AM:   production
7:28:40 AM: ​
7:28:40 AM: Build command from Netlify app                                
7:28:40 AM: ────────────────────────────────────────────────────────────────
7:28:40 AM: ​
7:28:40 AM: $ npm run build
7:28:40 AM: > airing-creditors-frontend@0.0.0 build
7:28:40 AM: > tsc -b && vite build
7:28:42 AM: src/components/resetPassword.tsx(37,30): error TS2353: Object literal may only specify known properties, and 'token' does not exist in type 'ResetPasswordPayload'.
7:28:42 AM: src/protectedRoutes/PaymentPage.tsx(4,10): error TS2305: Module '"../redux/fetchData"' has no exported member 'initiatePayment'.
7:28:42 AM: src/protectedRoutes/PaymentPage.tsx(81,31): error TS7006: Parameter 'expiryDate' implicitly has an 'any' type.
7:28:42 AM: src/protectedRoutes/PaymentPage.tsx(106,25): error TS7006: Parameter 'cardNumber' implicitly has an 'any' type.
7:28:42 AM: src/protectedRoutes/PaymentPage.tsx(327,14): error TS2304: Cannot find name 'token'.
7:28:42 AM: src/protectedRoutes/updateMeForm.tsx(31,31): error TS2345: Argument of type 'UpdateMePayload' is not assignable to parameter of type 'UpdateMePayload'.
7:28:42 AM:   Property 'userDetails' is missing in type 'UpdateMePayload' but required in type 'UpdateMePayload'.
7:28:42 AM: src/protectedRoutes/updateMeForm.tsx(67,41): error TS2304: Cannot find name 'loading'.
7:28:42 AM: src/protectedRoutes/updateMeForm.tsx(67,51): error TS2304: Cannot find name 'loading'.
7:28:42 AM: src/protectedRoutes/updatePassword.tsx(25,31): error TS2353: Object literal may only specify known properties, and 'token' does not exist in type 'UpdatePasswordPayload'.
7:28:42 AM: src/protectedRoutes/verifyPaymentPage.tsx(10,27): error TS2339: Property 'verifyStatus' does not exist on type 'PaymentState'.
7:28:42 AM: src/redux/fetchData.ts(23,16): error TS2552: Cannot find name 'strig'. Did you mean 'string'?
7:28:42 AM: src/redux/fetchData.ts(75,11): error TS6196: 'PaymentPayload' is declared but never used.
7:28:42 AM: src/redux/fetchData.ts(154,83): error TS2339: Property 'token' does not exist on type 'ResetPasswordPayload'.
7:28:42 AM: src/redux/loggedInUserSlice.ts(42,75): error TS2304: Cannot find name 'FetchUserResponse'.
7:28:42 AM: src/redux/paymentSlice.ts(2,10): error TS2305: Module '"./fetchData"' has no exported member 'initiatePayment'.
7:28:42 AM: src/redux/paymentSlice.ts(30,3): error TS2353: Object literal may only specify known properties, and 'verifyStatus' does not exist in type 'PaymentState'.
7:28:42 AM: src/redux/paymentSlice.ts(46,46): error TS2339: Property 'transactionId' does not exist on type 'PaymentResponse'.
7:28:42 AM: src/redux/paymentSlice.ts(47,44): error TS2339: Property 'phoneNumber' does not exist on type 'PaymentResponse'.
7:28:42 AM: src/redux/paymentSlice.ts(48,39): error TS2339: Property 'amount' does not exist on type 'PaymentResponse'.
7:28:42 AM: src/redux/paymentSlice.ts(49,39): error TS2339: Property 'status' does not exist on type 'PaymentResponse'.
7:28:42 AM: src/redux/paymentSlice.ts(61,8): error TS2769: No overload matches this call.
7:28:42 AM:   Overload 1 of 2, '(actionCreator: AsyncThunkFulfilledActionCreator<VerifyPaymentResponse, VerifyPaymentPayload, { rejectValue: string; state: { auth: AuthState; payment: PaymentState; user: UserState; userProfile: UserState; updateMe: UserState; }; ... 5 more ...; rejectedMeta?: unknown; }>, reducer: CaseReducer<...>): ActionReducerMapBuilder<...>', gave the following error.
7:28:42 AM:     Argument of type '(state: WritableDraft<PaymentState>, action: { payload: VerifyPaymentResponse; type: string; }) => void' is not assignable to parameter of type 'CaseReducer<PaymentState, PayloadAction<VerifyPaymentResponse, string, { arg: VerifyPaymentPayload; requestId: string; requestStatus: "fulfilled"; }, never>>'.
7:28:42 AM:       Types of parameters 'action' and 'action' are incompatible.
7:28:42 AM:         Type 'PayloadAction<VerifyPaymentResponse, string, { arg: VerifyPaymentPayload; requestId: string; requestStatus: "fulfilled"; }, never>' is not assignable to type '{ payload: VerifyPaymentResponse; type: string; }'.
7:28:42 AM:           The types of 'payload.transactionId' are incompatible between these types.
7:28:42 AM:             Type 'string | undefined' is not assignable to type 'string | null'.
7:28:42 AM:               Type 'undefined' is not assignable to type 'string | null'.
7:28:42 AM:   Overload 2 of 2, '(type: string, reducer: CaseReducer<PaymentState, { payload: VerifyPaymentResponse; type: string; }>): ActionReducerMapBuilder<PaymentState>', gave the following error.
7:28:42 AM:     Argument of type 'AsyncThunkFulfilledActionCreator<VerifyPaymentResponse, VerifyPaymentPayload, { rejectValue: string; state: { auth: AuthState; payment: PaymentState; user: UserState; userProfile: UserState; updateMe: UserState; }; ... 5 more ...; rejectedMeta?: unknown; }>' is not assignable to parameter of type 'string'.
7:28:42 AM: src/redux/paymentSlice.ts(64,15): error TS2339: Property 'verifyStatus' does not exist on type 'WritableDraft<PaymentState>'.
7:28:42 AM: src/redux/paymentSlice.ts(64,45): error TS2339: Property 'status' does not exist on type 'VerifyPaymentResponse'.
7:28:42 AM: ​
7:28:42 AM: "build.command" failed                                        
7:28:42 AM: ────────────────────────────────────────────────────────────────
7:28:42 AM: ​
7:28:42 AM:   Error message
7:28:42 AM:   Command failed with exit code 2: npm run build (https://ntl.fyi/exit-code-2)
7:28:42 AM: ​
7:28:42 AM:   Error location
7:28:42 AM:   In Build command from Netlify app:
7:28:42 AM:   npm run build
7:28:42 AM: ​
7:28:42 AM:   Resolved config
7:28:42 AM:   build:
7:28:42 AM:     command: npm run build
7:28:42 AM:     commandOrigin: ui
7:28:42 AM:     publish: /opt/build/repo/dist
7:28:42 AM:     publishOrigin: ui
7:28:43 AM: Failed during stage 'building site': Build script returned non-zero exit code: 2 (https://ntl.fyi/exit-code-2)
7:28:43 AM: Build failed due to a user error: Build script returned non-zero exit code: 2
7:28:43 AM: Failing build: Failed to build site
7:28:43 AM: Finished processing build request in 36.894s