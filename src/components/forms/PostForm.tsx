import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Models } from "appwrite";

import { postValidation } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";

import {
  useCreatePost,
  // useDeletePost,
  useUpdatePost,
} from "@/lib/react-query/queriesAndMutations";

type PostFormProps = {
  post?: Models.Document;
  action?: "Create" | "Update";
};

const PostForm = ({ post, action }: PostFormProps) => {
  const navigate = useNavigate();

  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost();
  const { mutateAsync: updatePost, isPending: isUpdatingPost } =
    useUpdatePost();
  // const { mutateAsync: deletePost, isPending: isDeletingPost } =
  //   useDeletePost();

  const { user } = useUserContext();
  const { toast } = useToast();

  // form validation
  const form = useForm<z.infer<typeof postValidation>>({
    resolver: zodResolver(postValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });

  // form submission handle
  const handleFormSubmit = async (values: z.infer<typeof postValidation>) => {
    if (post && action === "Update") {
      const updatedPost = await updatePost({
        ...values,
        postId: post?.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
      });

      if (!updatedPost) {
        toast({ title: "Please try again." });
      }
      return navigate(`/posts/${post.$id}`);
    }

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
            disabled={isLoadingCreate || isUpdatingPost}
          >
            {isLoadingCreate || (isUpdatingPost && "Loading...")}
            {action} Post
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
