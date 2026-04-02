import { UserMemojiOne } from "@/assets/svg/UserMemojiOne";
import { UserMemojiTwo } from "@/assets/svg/UserMemojiTwo";
import { User } from "@/types/user";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormControl, FormField, FormItem, FormMessage, Form } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { FaArrowRightLong, FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Button } from "../ui/button";
import { useGetSession } from "@/data/auth";
import { useUpdateMe } from "@/data/user";
import { UserIconFilled } from "@/assets/svg/UserIconFilled";
import { PiGenderNeuterFill } from "react-icons/pi";

const profileSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  memoji: z.number().min(1, {
    message: "Please select a memoji.",
  }),
  gender: z.number().min(1, {
    message: "Please select a gender.",
  }),
});

export default function General({ user }: { user: User }) {
  const { data: sessionData } = useGetSession();
  console.log(sessionData);
  const { mutateAsync: updateUser, isPending } = useUpdateMe();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: user.email,
      username: user.username,
      memoji: user.memoji ?? 1,
      gender: user.gender ?? 1,
    },
  });

  const selectedMemoji = form.watch("memoji");
  const onSubmit = (data: z.infer<typeof profileSchema>) => {
    updateUser({
      username: data.username,
      image: user.image ?? null,
      memoji: user.memoji ?? null,
      gender: data.gender ?? null,
    });
  };

  return (
    <div className="bg-white h-full overflow-scroll rounded-lg border p-4">
      <div className="grid text-sm text-black  gap-4">
        <h2 className="text-lg font-bold">General</h2>
        <div className="grid grid-cols-[5fr_8fr] gap-2">
          <label htmlFor="name" className="font-semibold">
            Memoji
            <p className="text-xs text-gray-500 font-normal">
              Your Memoji will be displayed in your profile and messages.
            </p>
          </label>
          <div className="flex items-center gap-2">
            <div
              onClick={() => form.setValue("memoji", 1)}
              className={`cursor-pointer ${selectedMemoji == 1 && "border-2 cursor-pointer shadow-2xl border-green-900"} rounded-full `}
            >
              <UserMemojiOne size="40" />
            </div>
            <div
              onClick={() => form.setValue("memoji", 2)}
              className={`cursor-pointer ${selectedMemoji == 2 && "border-2 cursor-pointer shadow-2xl border-green-900"} rounded-full `}
            >
              <UserMemojiTwo size="40" />
            </div>
          </div>
        </div>
        {/* <hr /> */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-4">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative  grid sm:grid-cols-[5fr_8fr] gap-2">
                      <label htmlFor="name" className="font-semibold my-auto text-sm">
                        Email
                      </label>
                      <div className="relative text-gray-400">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                          <MdEmail className="text-green-800" size={17} />
                        </div>
                        <Input
                          disabled
                          type="email"
                          placeholder="E-mail"
                          className="bg-white tesxt-[14px] border-gray-200 text-[#0a0a0a] placeholder:text-gray-400 rounded-full py-5 h-11 focus:border-primary-green pl-12"
                          {...field}
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative  grid sm:grid-cols-[5fr_8fr] gap-2">
                      <label htmlFor="name" className="font-semibold my-auto text-sm">
                        Username
                      </label>
                      <div className="relative text-gray-400">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                          <UserIconFilled color="#016630" size={20} />
                        </div>
                        <Input
                          type="text"
                          placeholder="Username"
                          className="bg-white border-gray-200 text-[#0a0a0a] placeholder:text-gray-400 rounded-full py-5 h-11 focus:border-primary-green pl-12"
                          {...field}
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative grid sm:grid-cols-[5fr_8fr] gap-2">
                      <label htmlFor="gender" className="font-semibold my-auto text-sm">
                        Gender
                      </label>
                      <div className="relative text-gray-400">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                          <PiGenderNeuterFill color="#016630" size={20} />
                        </div>
                        <Select
                          value={String(field.value ?? "")}
                          onValueChange={(value) => field.onChange(Number(value))}
                        >
                          <SelectTrigger
                            id="gender"
                            className="bg-white border-gray-200 text-[#0a0a0a] rounded-full py-5 h-11 pl-12"
                          >
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Male</SelectItem>
                            <SelectItem value="2">Female</SelectItem>
                            <SelectItem value="3">Non-binary</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                isLoading={isPending}
                showSpinner
                type="submit"
                // onClick={onSubmit}
                variant="primary-green"
                className=" rounded-full px-6 py-4 shadow-none"
              >
                {!isPending && (
                  <>
                    <span className="text-base pr-2">Save Changes</span>
                    <FaArrowRightLong size={15} className="text-white" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
        <hr />
      </div>
    </div>
  );
}
