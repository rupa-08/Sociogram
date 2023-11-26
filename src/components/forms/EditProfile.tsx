import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
import { useUserContext } from "@/context/AuthContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { updateUserValidation } from "@/lib/validation";
import ProfileImageUploader from "../shared/ProfileImageUploader";

const EditProfile = () => {
  const { user } = useUserContext();

  const form = useForm<z.infer<typeof updateUserValidation>>({
    resolver: zodResolver(updateUserValidation),
    defaultValues: {
      file: [],
      name: user ? user?.name : "",
      username: user ? user?.username : "",
      email: user ? user?.email : "",
      bio: user ? user.bio : "",
    },
  });

  const handleProfileUpdate = async (
    values: z.infer<typeof updateUserValidation>
  ) => {
    console.log("values", values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleProfileUpdate)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <ProfileImageUploader
                    fieldChange={field.onChange}
                    mediaUrl={user.imageUrl}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            );
          }}
        ></FormField>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        ></FormField>

        <Button type="submit" className="shad-button_primary whitespace-nowrap">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default EditProfile;
