import type { FC } from "react";
import { useForm } from "react-hook-form";
import type { LoginInput } from "../schemas/login";
import { loginSchema } from "../schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "ui/elements/button";

export type LoginProps = Record<string, never>;

export const Login: FC<LoginProps> = () => {
	const { register, handleSubmit } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });
	return (
		<div className="h-screen w-screen flex items-center justify-center">
			<div className="px-6 test-gray-500 md:px-12 xl:px-40">
				<div className="px-12 sm:px-0">
						<div className="py-12">
							<div>
								<a href="">
									<img
										src="src/assets/logo.svg"
										className="w-10 hidden dark:block dark:text-white"
										alt="tailus logo"
									/>
								</a>
							</div>
							<div className="mt-2 rounded-3xl border bg-gray-50 dark:border-gray-700 dark:bg-gray-800 -mx-6 sm:-mx-10 p-8 sm:p-10">
								<h3 className="text-2xl font-semibold text-gray-700 dark:text-white">
									Login to your account
								</h3>

								<form className="mt-10 space-y-8 dark:text-white" onSubmit={handleSubmit(console.log)}>
									<div>
										<div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
											<input
												id="email"
												type="text"
												placeholder=" "
												className="w-full bg-transparent pt-1  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition focus:outline-none focus:ring-0 focus:border-blue-500 peer" 
												{...register("email")}
											/>											
											<label htmlFor="password" className="absolute text-md text-gray-500 dark:text-white duration-300 transform -translate-y-4 scale-75 z-10 origin-[0] peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>

										</div>
									</div>

									<div className="flex flex-col items-end">
										<div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
											<input
												id="password"
												type="password"
												placeholder=" "
												className="w-full bg-transparent pt-1  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition focus:outline-none focus:ring-0 focus:border-blue-500 peer"
												{...register("password")}
											/>											
											<label htmlFor="password" className="absolute text-md text-gray-500 dark:text-white duration-300 transform -translate-y-4 scale-75 z-10 origin-[0] peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Password</label>
										</div>
										<Button type="reset"  variant="link">
												Forgot password ?
										</Button>
									</div>

									<div className="flex flex-col items-end">
										<Button type="submit">
												Login
										</Button>
										<Button type="reset" variant="link">
												Create new account
										</Button>
									</div>
								</form>
							</div>
							<div className="border-t text-gray-500 dark:border-gray-800">
								<div className="space-x-4 text-center">
									<span>&copy; Tailus</span>
									<a
										href="#"
										className="text-sm hover:text-sky-900 dark:hover:text-gray-300"
									>
										Contact
									</a>
									<a
										href="#"
										className="text-sm hover:text-sky-900 dark:hover:text-gray-300"
									>
										Privacy & Terms
									</a>
								</div>
							</div>
						</div>
				</div>
			</div>
		</div>
	);
};
