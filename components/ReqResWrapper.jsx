import JSONPretty from "react-json-pretty";
import Image from "next/image";
import { useState } from "react";

const ReqResWrapper = ({ apiKey, heading, endpoint, id, note, impNote, reqOptions, cutOutput, output, lastNote }) => {

    const [showOutput, setShowOutput] = useState(false);
    const [btnText, setBtnText] = useState('Show Output');

    const outputHandler = () => {
        if (showOutput) { setShowOutput(false); setBtnText('Show Output') }
        else {
            setBtnText('Hide Output')
            setShowOutput(true)
        }
    }

    return (
        <div>
            <h3 id={id} className="text-2xl text-medium mb-2">
                {heading}
            </h3>

            {impNote ? <div className="mb-2 font-medium">
                <span className="relative top-1.5 mr-1"><Image src="/exclamation-mark.png" width="25" height="25" /> </span>
                {impNote}</div> : null
            }
            {note ?
                <div className="mb-2">
                    <span className="relative top-1.5"><Image src="/sticky-notes.png" width="25" height="25" /> </span>
                    {note}
                </div>
                : null
            }

            {/* -------------------------------------------------------------------------------------------------------------------------- */}

            <section className="mb-14">
                <div className="mb-5 bg-gray-200 rounded-md p-4 overflow-x-scroll md:overflow-x-hidden">
                    <div className="mb-4">
                        <>
                            fetch(&quot;https://fakestores.onrender.com/api{endpoint}&quot;, {'{'} <br />
                            <div className="ml-6">
                                {/* {reqOptions.method.toUpperCase() !== "GET" && <>
                                    method: '{reqOptions.method.toUpperCase()}', <br />
                                </>} */}
                                method: &quot;{reqOptions.method.toUpperCase()}&quot;, <br />
                                {
                                    reqOptions.headers !== null
                                        ? <> headers: {'{'} <br />
                                            &emsp;&emsp;&quot;Accept&quot;: &quot;application/json&quot;, <br />
                                            &emsp;&emsp;&quot;Content-Type&quot;: &quot;application/json&quot;, <br />
                                            &emsp;&emsp;{
                                                reqOptions.headers.Authorization && apiKey
                                                    ? <> &quot;Authorization&quot;: &quot;Bearer {apiKey}&quot; <br /> </>
                                                    /* dummy api key => b3efbc4b-f835-4909-ae67-223e9d96d626 */
                                                    : null
                                            }
                                            {'}'}, <br />
                                        </>
                                        : null
                                }
                                {
                                    reqOptions.body ?
                                        <>body: JSON.stringify{'('}
                                            <JSONPretty className="ml-4" id="json-pretty" data={reqOptions.body} />
                                            {')'}
                                        </>
                                        : null
                                }
                            </div>
                            {'}'}
                            ).then(res=&gt; res.json()) <br />
                            &nbsp;&nbsp;.then(result=&gt; console.log(result)) <br />
                        </>
                    </div>
                </div>
                {
                    lastNote ? <div className="mb-4 font-semibold">
                        {lastNote}
                    </div> : null
                }
                <div>
                    {
                        <button className="flex items-center w-max text-white py-2 px-6 mb-5 bg-indigo-500 rounded shadow cursor-pointer hover:bg-indigo-600 hover:text-gray-100  text-xs font-medium text-lg"
                            onClick={() => outputHandler()}
                        >
                            {btnText}
                        </button>
                    }
                </div>
                {
                    showOutput
                        ? cutOutput
                            ? <div className="mt-5 rounded-md bg-gray-200 p-4 overflow-y-auto overflow-x-auto" style={{ maxHeight: "95vh" }}>
                                {'['}
                                <div className="ml-5">
                                    <JSONPretty className="" id="json-pretty" data={output[0]} />
                                    <br /><span className="font-semibold">{'/* ... */'}</span>
                                    <br /> <br />
                                    <JSONPretty className="" id="json-pretty" data={output[1]} />
                                </div>
                                {']'}
                            </div>
                            : <div className="mt-5 rounded-md bg-gray-200 p-4 overflow-x-auto">
                                <JSONPretty className="" id="json-pretty" data={output} />
                            </div>
                        : null
                }
            </section>
        </div>
    )
}

export default ReqResWrapper
