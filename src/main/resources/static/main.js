
const root = ReactDOM.createRoot(document.getElementById('app'));
const  {useEffect, useState} = React;
function VerificationPage(){
    const input = document.querySelector("#phone");

    const [number, setNumber] = useState('');

    const handleChange = (e)=>{
        setNumber(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input.value.trim())
    };

    useEffect(()=>{
        const input = document.querySelector("#phone");

        const iti = window.intlTelInput(input, {
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
            initialCountry: "auto",
            geoIpLookup: function(callback) {
                fetch("https://ipapi.co/json")
                    .then(function(res) { return res.json(); })
                    .then(function(data) { callback(data.country_code); })
                    .catch(function() { callback("ng"); });
            }
        });

        console.log(iti.s);
    },[])
    return (
        <div className="justify-center items-center bg-lime-100 flex flex-col px-16 py-12 max-md:px-5 min-h-screen">
            <form onSubmit={handleSubmit} className="flex w-[549px] max-w-full flex-col items-stretch">
                <div className="flex flex-col gap-14">
                    <h1 className="text-black text-2xl font-semibold self-center max-md:max-w-full">
                        Verify a number and know the location{" "}
                    </h1>

                    <input
                        id="phone"
                        name="number"
                        type="tel"
                        onChange={handleChange}
                        placeholder="Enter a number"
                        className="block rounded-md w-full text-neutral-500 text-base text-md whitespace-nowrap border border-black bg-white justify-center items-start max-md:max-w-full py-3 px-4 font-medium focus:outline-none focus:border-lime-300"/>

                </div>
                <VerifyButton/>
            </form>
        </div>
    );

}

function VerifyButton(){
    //const { pending } = useFormStatus();
    return (
        <button type="submit" className="text-white text-center text-base whitespace-nowrap justify-start items-center bg-black self-center w-[180px] max-w-full mt-4 px-10 py-3 rounded-md max-md:px-5 font-medium">
            Verify
        </button>
    );
}

root.render(<VerificationPage/>)
