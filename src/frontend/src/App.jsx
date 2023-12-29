import {useState} from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

function App() {
    const [number, setNumber] = useState(0);
    const [isSubmitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);
        setSubmitting(true)

        try {
            const res = await fetch('http://localhost:8080/validate-number', {
                method: 'POST', body: JSON.stringify({number: number}), headers: {
                    "Content-Type": 'application/json'
                }
            })
            const data = await res.json()

            setSubmitting(false)

            if (!data?.success && data.hasOwnProperty('success')) {
                console.log(data, data.hasOwnProperty('success'));
                setErrorMessage(data);
            }else{
                setSuccessMessage(data);
            }

        } catch (error) {
            setSubmitting(false);
            setErrorMessage({
                "success": false, "error": {
                    "code": 210, "type": "server error", "info": "Something went wrong!"
                }
            })
            console.error(error);
        }
    }

    return (<>
        <div className="justify-center items-center bg-lime-100 flex flex-col px-16 py-12 max-md:px-5 min-h-screen">
            <form onSubmit={handleSubmit} className="flex w-[549px] max-w-full flex-col items-stretch">
                <div className="flex flex-col gap-14">
                    <h1 className="text-black text-2xl font-semibold self-center max-md:max-w-full">
                        Verify a number, discover the location, and network provider.
                    </h1>
                    <PhoneInput
                        country={'ng'}
                        value={number}
                        onChange={(e) => {
                            setNumber(e)
                        }}
                        containerClass="phone_input_container"
                        inputClass="phone_input"
                    />
                </div>
                <button type="submit"
                        className="text-white text-center text-base whitespace-nowrap justify-start items-center bg-black self-center w-[180px] max-w-full mt-4 px-10 py-3 rounded-md max-md:px-5 font-medium">
                    {isSubmitting ? 'Loading...' : 'Verify'}
                </button>
            </form>
            <div
                className={`${!errorMessage && 'hidden'} text-red-600 text-base border bg-zinc-50 self-stretch justify-center items-stretch mt-14 px-9 py-7 border-solid border-black max-md:max-w-full max-md:mt-10 max-md:px-5`}>
                {errorMessage?.error?.info}
            </div>

            <div
                className={`${!successMessage && 'hidden'} mt-16 bg-white md:p-10 p-5 flex flex-col gap-2 border border-black max-w-2xl w-full `}>
                <div className="items-center flex gap-5">
                    <div className="font-semibold">Valid:</div>
                    <div className="font-medium">{JSON.stringify(successMessage?.valid)?.toUpperCase()}</div>
                </div>
                <div className="items-center flex gap-5">
                    <div className="font-semibold">Number:</div>
                    <div className="font-medium">{successMessage?.number}</div>
                </div>
                <div className="items-center flex gap-5">
                    <div className="font-semibold">Local Format:</div>
                    <div className="font-medium">{successMessage?.local_format}</div>
                </div>
                <div className="items-center flex gap-5">
                    <div className="font-semibold">International Format:</div>
                    <div className="font-medium">{successMessage?.international_format}</div>
                </div>
                <div className="items-center flex gap-5">
                    <div className="font-semibold">Country Prefix:</div>
                    <div className="font-medium">{successMessage?.country_prefix}</div>
                </div>
                <div className="items-center flex gap-5">
                    <div className="font-semibold">Country Code:</div>
                    <div className="font-medium">{successMessage?.country_code}</div>
                </div>
                <div className="items-center flex gap-5">
                    <div className="font-semibold">Country Name:</div>
                    <div className="font-medium">{successMessage?.country_name}</div>
                </div>
                <div className="items-center flex gap-5">
                    <div className="font-semibold">Location:</div>
                    <div className="font-medium">{successMessage?.location}</div>
                </div>
                <div className="items-center flex gap-5">
                    <p className="font-semibold">Carrier:</p>
                    <p className="font-medium">{successMessage?.carrier}</p>
                </div>
                <div className="items-center flex gap-5">
                    <p className="font-semibold">Line Type:</p>
                    <p className="font-medium">{successMessage?.line_type}</p>
                </div>

            </div>

            <div className="pt-20 pb-6 font-medium">
                Implemented by <a href="https://github.com/samiecode" className="underline">Samie Azubike</a>
            </div>
        </div>

    </>)
}

export default App
