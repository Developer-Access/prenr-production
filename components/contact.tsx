/* eslint-disable react/no-unescaped-entities */
import { useState, FormEvent } from 'react'
import { Switch } from '@headlessui/react'
import Image from "next/image";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function ContactForm() {
    const [agreed, setAgreed] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        phoneNumber: '',
        message: '',
        agreed: false,
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/mailhandler', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            console.warn(response.status);

            if (!response.ok) {
                throw new Error(`Failed to send message: ${response.status}`);
            }

            alert('Message successfully sent');
            setFormData({
                firstName: '',
                lastName: '',
                company: '',
                email: '',
                phoneNumber: '',
                message: '',
                agreed: false,
            });
        } catch (error) {
            console.error(error);
            alert('Error, please try resubmitting the form');
        }
    };

    // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch('/api/hello', {
    //             method: 'POST',
    //             body: new FormData(e.currentTarget),
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //         });

    //         if (!response.ok) {
    //             console.log("falling over");
    //             throw new Error(`response status: ${response.status}`);
    //         }

    //         const responseData = await response.json();
    //         console.log(responseData['message']);

    //         alert('Message successfully sent');
    //     } catch (err) {
    //         console.error(err);
    //         alert('Error, please try resubmitting the form');
    //     }
    // };

    // async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    //     e.preventDefault();
    //     const formData = new FormData(e.currentTarget);
    //     try {
    //         const response = await fetch('/api/hello', {
    //             method: 'POST',
    //             body: formData,
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //         });

    //         if (!response.ok) {
    //             console.log("falling over");
    //             throw new Error(`response status: ${response.status}`);
    //         }
    //         const responseData = await response.json();
    //         console.log(responseData['message']);

    //         alert('Message successfully sent');
    //         console.log("FormData:" + formData + "ResponseData: " + responseData)
    //     } catch (err) {
    //         console.error(err);
    //         alert("Error, please try resubmitting the form");
    //     }
    // }
    // async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    //     e.preventDefault();
    //     const formData = new FormData(e.currentTarget);
    //     try {
    //         const response = await fetch('/api/hello', {
    //             method: 'POST',
    //             body: JSON.stringify(formData),
    //         });

    //         if (!response.ok) {
    //             console.log("falling over");
    //             throw new Error(`response status: ${response.status}`);
    //         }
    //         const responseData = await response.json();
    //         console.log(responseData['message']);

    //         alert('Message successfully sent');
    //         console.log("FormData:" + formData + "ResponseData: "+ responseData )
    //     } catch (err) {
    //         console.error(err);
    //         alert("Error, please try resubmitting the form");
    //     }
    // }

    // async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    //     e.preventDefault();
    //     const formData = new FormData(e.currentTarget);
    //     try {
    //         const response = await fetch('/api/hello', {
    //             method: 'POST',
    //             body: JSON.stringify(formData),
    //             headers: {
    //                 "Content-Type": "application/json",
    //                  Accept: "application/json",
    //                },
    //         });

    //         if (!response.ok) {
    //             console.log("falling over");
    //             throw new Error(`response status: ${response.status}`);
    //         }
    //         const responseData = await response.json();
    //         console.log(responseData['message']);

    //         alert('Message successfully sent');
    //     } catch (err) {
    //         console.error(err);
    //         alert("Error, please try resubmitting the form");
    //     }
    // }

    return (
        <div id='Contact' className="relative isolate overflow-hidden bg-white px-6 py-4 sm:py-6 lg:overflow-visible lg:px-0">
            <div className="absolute inset-0 -z-5 overflow-hidden">
                <svg
                    className="absolute left-[max(50%,25rem)] top-12 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern
                            id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                            width={200}
                            height={200}
                            x="50%"
                            y={-1}
                            patternUnits="userSpaceOnUse"
                        >
                            <path d="M100 200V.5M.5 .5H200" fill="none" />
                        </pattern>
                    </defs>
                    <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                        <path
                            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                            strokeWidth={0}
                        />
                    </svg>
                    <rect width="100%" height="100%" strokeWidth={0} fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
                </svg>

            </div>
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-1 lg:items-start lg:gap-y-10">
                <div className="lg:sticky lg:top-4 lg:col-start-1 lg:row-span-2 lg:row-start-2 lg:overflow-hidden">

                    <div className="isolate bg-white/0.5 px-6 py-24 sm:py-32 lg:px-8 flex grid-cols-1 grid-rows-1 items-center justify-center">
                        <div className='flex-inline items-center justify-center'>
                            <Image
                                className="hidden lg:flex h-auto w-auto m-10"
                                src="/LET’S GET.svg"
                                alt=""
                                height={213}
                                width={610}
                            />
                        </div>
                        <div>
                            <div
                                className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-10rem]"
                                aria-hidden="true"
                            >
                                <div
                                    className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                                    style={{
                                        clipPath:
                                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                                    }}
                                />
                            </div>
                            <div className="mx-auto max-w-2xl text-center">
                                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact</h2>
                                <p className="mt-2 text-lg leading-8 text-gray-600">
                                    Aute magna irure deserunt veniam aliqua magna enim voluptate.
                                </p>
                            </div>
                            <form onSubmit={handleSubmit} method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
                                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                            First name
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                type="text"
                                                name="firstName"
                                                id="first-name"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                autoComplete="first-name"
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                            Last name
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                type="text"
                                                name="lastName"
                                                id="last-name"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                autoComplete="family-name"
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                                            Company
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                type="text"
                                                name="company"
                                                id="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                autoComplete="organization"
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                            Email
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                autoComplete="email"
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                                            Phone number
                                        </label>
                                        <div className="relative mt-2.5">
                                            <input
                                                type="tel"
                                                name="phoneNumber"
                                                id="phone-number"
                                                value={formData.phoneNumber}
                                                onChange={handleChange}
                                                autoComplete="tel"
                                                className="block w-full rounded-md border-0 px-2.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                                            Message
                                        </label>
                                        <div className="mt-2.5">
                                            <textarea
                                                name="message"
                                                id="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows={4}
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
                                        <div className="flex h-6 items-center">
                                            <Switch
                                                checked={agreed}
                                                onChange={setAgreed}
                                                className={classNames(
                                                    agreed ? 'bg-red-600' : 'bg-gray-200',
                                                    'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
                                                )}
                                            >
                                                <span className="sr-only">Agree to policies</span>
                                                <span
                                                    aria-hidden="true"
                                                    className={classNames(
                                                        agreed ? 'translate-x-3.5' : 'translate-x-0',
                                                        'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                                                    )}
                                                />
                                            </Switch>
                                        </div>
                                        <Switch.Label className="text-sm leading-6 text-gray-600">
                                            By selecting this, you agree to our{' '}
                                            <a href="#" className="font-semibold text-red-600">
                                                privacy&nbsp;policy
                                            </a>
                                            .
                                        </Switch.Label>
                                    </Switch.Group>
                                </div>
                                <div className="mt-10">
                                    <button
                                        type="submit"
                                        className="block w-full rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                    >
                                        Let's talk
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div>
                            <Image
                                className="hidden lg:flex h-auto w-auto m-10"
                                src="/STARTED.svg"
                                alt=""
                                height={213}
                                width={610}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
