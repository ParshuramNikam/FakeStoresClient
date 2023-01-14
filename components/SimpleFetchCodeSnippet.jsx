import React, { useEffect, useState } from 'react'
import JSONPretty from "react-json-pretty";

const SimpleFetchCodeSnippet = ({ endpoint, btnType, httpMethod, reqBody, doRequest, output }) => {

    const [outputObj, setOutputObj] = useState({});
    const [outputArray, setOutputArray] = useState([]);
    const [outputType, setOutputType] = useState('');
    const [showOutput, setShowOutput] = useState(false); 
    const [btnText, setBtnText] = useState('Show Output');
    // const [requestOptions] = useState(reqOptions);

    const outputHandler = () => {
        if (showOutput) { setShowOutput(false); setBtnText('Show Output') }
        else {
            setBtnText('Hide Output')
            setShowOutput(true)
        }
    }

    const apiCall = () => {
        try {
            return fetch(`https://fakestores.onrender.com/api${endpoint}`, {
                method: httpMethod,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqBody),
            })
        } catch (error) {
            console.log("Error at endpoint:-", endpoint);
            console.error(error);
        }
    }

    const fetchRequest = async () => {
        if (doRequest !== 'false') {
            console.log();
            await apiCall()
                .then(res => { console.log(endpoint, res); return res.json() })
                .then(result => {
                    console.log(result);
                    if (Array.isArray(result)) {
                        setOutputType('array');
                        setOutputArray(result);
                        console.log(outputArray);
                    }
                    else {
                        setOutputType('obj');
                        setOutputObj(result)
                        console.log(outputObj);
                    }

                    return result;
                });
        }

        // const result = fetchedData.json();

    }

    useEffect(() => {
        fetchRequest();
        const httpMethodsWithBody = ["POST", "PUT", "PATCH", "DELETE"];
    }, [])

    return (
        <section className="mb-14">
            <div className="mb-5 bg-gray-200 rounded-md p-4 overflow-x-scroll md:overflow-x-hidden">
                <div className="mb-4">

                    {httpMethod
                        ? <>
                            fetch(&apos;https://fakestores.onrender.com/api{endpoint}&apos;, {'{'}<br />
                            
                            {<div className="ml-6">
                                method: &quot;{httpMethod}&quot;, <br />
                                <div className="flex">
                                    &apos;headers&apos;: {'{'} <br />
                                    &emsp;&emsp;&apos;Accept&apos;: &apos;application/json&apos;, <br />
                                    &emsp;&emsp;&apos;Content-Type&apos;: &apos;application/json&apos;, <br />
                                    &emsp;&emsp;&apos;Authorization&apos;: &apos;Bearer d8cadd2d-0ee2-4bc3-8da0-8eef4afb8288&apos;, <br />
                                    {'}'},
                                </div>
                                {reqBody
                                    ? <> body: JSON.stringify{'('} <br />
                                        <JSONPretty className="ml-6" id="json-pretty" data={reqBody} />{')'}
                                    </>
                                    : null
                                }
                            </div>}
                            {'})'} <br />
                        </>
                        : <> fetch(&apos;https://fakestores.onrender.com/api{endpoint}&apos;) <br /> </>
                    }
                    &emsp;.then(res=&gt; res.json()) <br />
                    &emsp;.then(result=&gt; console.log(result)) <br />
                </div>
            </div>
            <div>
                {
                    btnType === "outline"
                        ? <button className="transition duration-500 ease-in-out flex items-center w-max py-2 px-6 mb-5 bg-transparent border-2 text-indigo-500 border-indigo-600 rounded shadow-sm cursor-pointer hover:bg-indigo-600 hover:text-gray-100 text-xs font-medium text-lg"
                            onClick={() => outputHandler()}>
                            {btnText}
                        </button>
                        : <button className="flex items-center w-max text-white py-2 px-6 mb-5 bg-indigo-500 rounded shadow cursor-pointer hover:bg-indigo-600 hover:text-gray-100  text-xs font-medium text-lg"
                            onClick={() => outputHandler()}
                        >
                            {btnText}
                        </button>
                }
            </div>
            {
                showOutput
                    ? doRequest === "false"
                        ? <div className="mt-5 rounded-md bg-gray-200 p-4 overflow-x-auto">
                            <code>
                                <JSONPretty data={output} />
                            </code>
                        </div>
                        :
                        outputType === 'obj'
                            ? (<div className="mt-5 rounded-md bg-gray-200 p-4 overflow-x-auto">
                                {
                                    outputObj !== {}
                                        ? <JSONPretty id="json-pretty" data={outputObj} />
                                        : <><span className="text-gray-200 text-lg">Loading...</span>
                                            {console.log("empty")}
                                        </>
                                }
                            </div>)
                            : (<div className="mt-5 rounded-md bg-gray-200 p-4 overflow-x-auto ">
                                {
                                    outputArray === []
                                        ? (<><span className="text-gray-200 text-lg">Loading...</span>
                                            {console.log("empty")}
                                        </>)
                                        : outputArray.length > 3
                                            ? (<code>
                                                {
                                                    (endpoint !== "/categories" && !httpMethod)
                                                        ? <div key={endpoint}> {'['}
                                                            <div className="ml-5">
                                                                {<>
                                                                    <JSONPretty id="json-pretty" data={outputArray[0]} />
                                                                    <span className="text-gray-600">&#47;*...*&#47;</span>
                                                                    <JSONPretty id="json-pretty" data={outputArray[outputArray.length - 1]} />
                                                                </>
                                                                }
                                                            </div>
                                                            {']'} </div>
                                                        : <div className="ml-5">
                                                            {
                                                                endpoint === "/categories"
                                                                    ? <JSONPretty id="json-pretty" data={outputArray} />
                                                                    : <>
                                                                        <JSONPretty id="json-pretty" data={outputArray[0]} />
                                                                        <span className="text-gray-600">&#47;*...*&#47;</span>
                                                                        <JSONPretty id="json-pretty" data={outputArray[outputArray.length - 1]} />
                                                                    </>
                                                            }
                                                        </div>
                                                }
                                            </code>)
                                            : <JSONPretty id="json-pretty" data={outputArray} />
                                }
                            </div>)
                    : null
            }
        </section>
    )
}

export default SimpleFetchCodeSnippet
