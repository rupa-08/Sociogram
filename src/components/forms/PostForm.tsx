import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import FileUploader from "../shared/FileUploader";
import { postValidation } from "@/lib/validation";
import { Models } from "appwrite";
import { useCreatePost } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";

type PostFormProps = {
  post?: Models.Document;
};

const PostForm = ({ post }: PostFormProps) => {
  const { user } = useUserContext();
  const { toast } = useToast();
  const { mutateAsync: createPost, isPending: isLoadingPost } = useCreatePost();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof postValidation>>({
    resolver: zodResolver(postValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });

  const handleFormSubmit = async (values: z.infer<typeof postValidation>) => {
    const newPost = await createPost({ ...values, userId: user.id });

    if (!newPost) {
      toast({ title: "Please try again." });
    }
    navigate("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="shad-form_label">Caption</FormLabel>
                <FormControl>
                  <Textarea
                    className="shad-textarea custom-scrollbar"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            );
          }}
        ></FormField>
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="shad-form_label">Add photos</FormLabel>
                <FormControl>
                  <FileUploader
                    fieldChange={field.onChange}
                    mediaUrl={post?.imageUrl}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            );
          }}
        ></FormField>
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Loaction</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            );
          }}
        ></FormField>
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Add Tags (Separated by ",")</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="shad-input"
                    {...field}
                    placeholder="JS, React, NextJS"
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            );
          }}
        ></FormField>
        <div className="flex gap-4 items-center justify-end">
          <Button type="button" className="shad-button_dark_4">
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
