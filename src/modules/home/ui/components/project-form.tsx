"use client"

import {z} from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextareaAutosize from 'react-textarea-autosize';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowUpIcon, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation"; 
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { PROJECT_TEMPLATES } from "../../constants";
import { useClerk } from "@clerk/nextjs";

const formSchema = z.object({
    value: z.string()
           .min(1, { message: "value is required"})
           .max(10000, { message: "Value is too long"}),
})

export const ProjectForm = () => {
    const router = useRouter(); // Added this back
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const clerk = useClerk();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            value: "",
        },
    });

    const createProject = useMutation(trpc.projects.create.mutationOptions({
        onSuccess: (data) => {

            queryClient.invalidateQueries({
                queryKey: [['projects']], 
            });
            
            form.reset();
            
            toast.success("Project created successfully!");

            // Redirect to the created project page
            router.push(`/projects/${data.id}`);

            // TODO: Invalidate usage status
        },
        onError: (error) => {
            if (error.data?.code === "UNAUTHORIZED") {
                clerk.openSignIn();
            }
            if (error.data?.code === "TOO_MANY_REQUESTS") {
                router.push("/pricing");
            }
        }
    }));

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!values.value.trim()) {
            toast.error("Please enter a value");
            return;
        }
        
        await createProject.mutateAsync({
            value: values.value,
        })
    };

    const onSelect = (value: string) => {
        form.setValue("value", value,{
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    };

    const [isFocused, setIsFocused] = useState(false);
    const isPending = createProject.isPending;
    const isButtonDisabled = isPending || !form.formState.isValid;

    return (
        <Form {...form}>
            <section className="space-y-6">
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn(
                    "relative border p-4 pt-1 rounded-xl bg-sidebar dark:bg-sidebar transition-all",
                    isFocused && "shadow-xs",
                )}
            >
                <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                        <TextareaAutosize
                            {...field}
                            disabled={isPending}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            minRows={2}
                            maxRows={8}
                            className="pt-4 resize-none border-none w-full outline-none bg-transparent"
                            placeholder="What would you like to build?"
                            onKeyDown={(e) => {
                                // Submit on Enter (without Ctrl/Cmd)
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    
                                    // Check if form is valid and not pending
                                    if (form.formState.isValid && !isPending && field.value.trim()) {
                                        form.handleSubmit(onSubmit)();
                                    }
                                }
                                
                                // Allow Shift+Enter for new line
                                if (e.key === "Enter" && e.shiftKey) {
                                    // Let the default behavior happen (new line)
                                    return;
                                }
                            }}
                        />
                    )}
                />
                <div className="flex gap-x-2 items-end justify-between pt-2">
                    <div className="text-[10px] text-muted-foreground font-mono">
                        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                            <span>
                                ↵
                            </span> 
                        </kbd>
                        &nbsp;to submit • 
                        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                            <span>
                                ⇧↵
                            </span> 
                        </kbd>
                        &nbsp;for new line
                    </div>
                    <Button 
                        type="submit"
                        disabled={isButtonDisabled}
                        className={cn(
                            "size-8 rounded-full",
                            isButtonDisabled && "bg-muted-foreground border"
                        )}
                    >
                        {isPending ? (
                            <Loader2Icon className="size-4 animate-spin" />
                        ) : (
                            <ArrowUpIcon className="size-4" />
                        )}
                    </Button>
                </div>
            </form>
            <div className="flex-wrap justify-center gap-2 hidden md:flex max-w-3xl">
                {PROJECT_TEMPLATES.map((template)=>(
                    <Button key={template.title}
                    variant="outline"
                    size="sm"
                    className="bg-blue dark:bg-sidebar"
                    onClick={() => onSelect(template.prompt)}
                    >
                      {template.emoji} {template.title}
                    </Button>
                ))}
            </div>
            </section>
        </Form>
    );
};


