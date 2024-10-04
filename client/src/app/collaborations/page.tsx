"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import features from "./features.json";
import categories from "./categories.json";
import locations from "./locations.json";
import types from "./types.json";
import reimbursements from "./reimbursements.json";
import dummyData from "./dummyData.json";
import { Textarea } from "@/components/ui/textarea";

export default function CollaborationsPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [checkedCategories, setCheckedCategories] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("N/A");
  const [selectedType, setSelectedType] = useState<string>("N/A");
  const [checkedReimbursments, setCheckedReimbursments] = useState<string[]>(
    []
  );

  const handleSearch = () => {
    console.log({
      searchQuery,
      checkedCategories,
      selectedLocation,
      selectedType,
      checkedReimbursments,
    });
  };

  const handleClear = () => {
    setSearchQuery("");
    setCheckedCategories([]);
    setSelectedLocation("N/A");
    setSelectedType("N/A");
    setCheckedReimbursments([]);
  };

  return (
    <main className="bg-accent">
      <div className="container flex flex-col min-h-screen gap-8 py-8">
        <TitleSection />
        <div className="flex flex-col gap-4 lg:flex-row">
          <SidePanel
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            checkedCategories={checkedCategories}
            setCheckedCategories={setCheckedCategories}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            checkedReimbursments={checkedReimbursments}
            setCheckedReimbursments={setCheckedReimbursments}
            handleSearch={handleSearch}
            handleClear={handleClear}
          />
          <ContentPanel />
        </div>
      </div>
    </main>
  );
}

function TitleSection() {
  return (
    <section className="flex items-center justify-between">
      <div className="prose">
        <h2>Collaborations</h2>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Create Collaboration</Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm md:max-w-xl">
          <DialogHeader className="items-center">
            <DialogTitle>Oops! You need to be subscribed.</DialogTitle>
            <DialogDescription>
              Sign up for 30 days free trial to get full access.
            </DialogDescription>
          </DialogHeader>

          <Button className="mx-16">
            <Link href="/sign-up">Sign Up Now</Link>
          </Button>

          <div className="prose-sm prose">
            <p>Other features you'll also get full access to:</p>
            {features.map((feature, index) => (
              <p key={index}>
                <b>{feature.title}</b>
                <br />
                <span className="hidden md:inline">{feature.description}</span>
              </p>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

interface SidePanelProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  checkedCategories: string[];
  setCheckedCategories: Dispatch<SetStateAction<string[]>>;
  selectedLocation: string;
  setSelectedLocation: Dispatch<SetStateAction<string>>;
  selectedType: string;
  setSelectedType: Dispatch<SetStateAction<string>>;
  checkedReimbursments: string[];
  setCheckedReimbursments: Dispatch<SetStateAction<string[]>>;
  handleSearch: () => void;
  handleClear: () => void;
}

function SidePanel({
  searchQuery,
  setSearchQuery,
  checkedCategories,
  setCheckedCategories,
  selectedLocation,
  setSelectedLocation,
  selectedType,
  setSelectedType,
  checkedReimbursments,
  setCheckedReimbursments,
  handleSearch,
  handleClear,
}: SidePanelProps) {
  return (
    <Card className="lg:w-72 h-fit">
      <CardHeader>
        <div className="prose-sm prose">
          <h3>Filter</h3>
          <hr className="my-4" />
          <Searchbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <CategoriesList
            checkedCategories={checkedCategories}
            setCheckedCategories={setCheckedCategories}
          />
          <LocationList
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
          <TypeList
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
          <ReimbursementList
            checkedReimbursments={checkedReimbursments}
            setCheckedReimbursments={setCheckedReimbursments}
          />
          <div className="flex justify-between gap-2 mt-4">
            <Button onClick={handleSearch} className="flex-1">
              Search
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

interface SearchbarProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

function Searchbar({ searchQuery, setSearchQuery }: SearchbarProps) {
  return (
    <Input
      placeholder="Search"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
}
interface CategoriesListProps {
  checkedCategories: string[];
  setCheckedCategories: Dispatch<SetStateAction<string[]>>;
}

function CategoriesList({
  checkedCategories,
  setCheckedCategories,
}: CategoriesListProps) {
  const handleCheckboxChange = (category: string, checked: boolean) => {
    if (checked) {
      setCheckedCategories((prev) => [...prev, category]);
    } else {
      setCheckedCategories((prev) =>
        prev.filter((checkedCategory) => checkedCategory !== category)
      );
    }
  };

  return (
    <div>
      <h4>Categories</h4>
      {categories.data.map((category) => (
        <div key={category} className="flex items-center gap-2">
          <Checkbox
            id={category}
            checked={checkedCategories.includes(category)}
            onCheckedChange={(checked) =>
              handleCheckboxChange(category, !!checked)
            }
          />
          <label htmlFor={category}>{category}</label>
        </div>
      ))}
    </div>
  );
}

interface LocationListProps {
  selectedLocation: string;
  setSelectedLocation: Dispatch<SetStateAction<string>>;
}

function LocationList({
  selectedLocation,
  setSelectedLocation,
}: LocationListProps) {
  return (
    <div>
      <h4>Location</h4>
      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
        <SelectTrigger>
          <SelectValue placeholder="Select a location" />
        </SelectTrigger>
        <SelectContent>
          {locations.data.map((location) => (
            <SelectItem key={location} value={location}>
              {location}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

interface TypeListProps {
  selectedType: string;
  setSelectedType: Dispatch<SetStateAction<string>>;
}

function TypeList({ selectedType, setSelectedType }: TypeListProps) {
  return (
    <div>
      <h4>Type</h4>
      <Select value={selectedType} onValueChange={setSelectedType}>
        <SelectTrigger>
          <SelectValue placeholder="Select a type" />
        </SelectTrigger>
        <SelectContent>
          {types.data.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

interface ReimbursementListProps {
  checkedReimbursments: string[];
  setCheckedReimbursments: Dispatch<SetStateAction<string[]>>;
}

function ReimbursementList({
  checkedReimbursments,
  setCheckedReimbursments,
}: ReimbursementListProps) {
  const handleCheckboxChange = (reimbursement: string, checked: boolean) => {
    if (checked) {
      setCheckedReimbursments((prev) => [...prev, reimbursement]);
    } else {
      setCheckedReimbursments((prev) =>
        prev.filter(
          (checkedReimbursement) => checkedReimbursement !== reimbursement
        )
      );
    }
  };
  return (
    <div>
      <h4>Reimbursement</h4>
      {reimbursements.data.map((reimbursement) => (
        <div key={reimbursement} className="flex items-center gap-2">
          <Checkbox
            checked={checkedReimbursments.includes(reimbursement)}
            onCheckedChange={(checked) =>
              handleCheckboxChange(reimbursement, !!checked)
            }
          />
          <label htmlFor={reimbursement}>{reimbursement}</label>
        </div>
      ))}
    </div>
  );
}

function ContentPanel() {
  return (
    <div className="flex flex-col flex-1 gap-4">
      <div className="prose-sm prose">
        <h3>Most Recent Paid</h3>
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {dummyData.map((post) => {
          const date = new Date(post.date * 1000);
          const formattedDate = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });
          return (
            <Card key={post.id}>
              <CardHeader className="flex flex-col justify-between h-full">
                <div className="prose-sm prose">
                  <h4>{post.name}</h4>
                  <p className="m-0 text-sm opacity-75">{formattedDate}</p>
                  <hr className="my-2" />
                  <p>
                    <b>Company: </b>
                    {post.company}
                    <br />
                    <b>Contact: </b>
                    {post.contact ? (
                      <span>{post.contact}</span>
                    ) : (
                      <i className="opacity-75">Hidden</i>
                    )}
                    <br />
                    <b>Location: </b>
                    {post.location.join(", ")}
                    <br />
                    <b>Link: </b>
                    {post.link ? (
                      <Link
                        href={post.link}
                        className="no-underline hover:underline"
                      >
                        Visit Link
                      </Link>
                    ) : (
                      <i className="opacity-75">Hidden</i>
                    )}
                    <br />
                    <b>Reimbursement: </b>
                    {post.reimbursement}
                    <br />
                    <span className={clsx({ hidden: post.budget === null })}>
                      <b>Budget: </b>
                      {post.budget}$
                    </span>
                  </p>
                  <p className="p-2 rounded shadow bg-accent">{post.type}</p>
                  <p>{post.description}</p>
                </div>
                <MessageDialog postName={post.name} postEmail={post.email} />
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

interface MessageDialogProps {
  postName: string;
  postEmail: string;
}

const messageDialogSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  link: z.string().url("Invalid URL"),
  message: z.string().min(1, "Message is required"),
  subject: z.string().min(1, "Subject is required"),
});

function MessageDialog({ postName, postEmail }: MessageDialogProps) {
  const messageDialogForm = useForm<z.infer<typeof messageDialogSchema>>({
    resolver: zodResolver(messageDialogSchema),
    defaultValues: {
      subject: postName || "",
      name: "",
      email: "",
      link: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof messageDialogSchema>) {
    console.log(values, postEmail);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Send a message</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm md:max-w-xl">
        <DialogHeader>
          <DialogTitle>Send a message</DialogTitle>
        </DialogHeader>

        <Form {...messageDialogForm}>
          <form
            onSubmit={messageDialogForm.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* Name Field */}
            <FormField
              control={messageDialogForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={messageDialogForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Link Field */}
            <FormField
              control={messageDialogForm.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a link (URL)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Subject Field */}
            <FormField
              control={messageDialogForm.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a subject" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message Field */}
            <FormField
              control={messageDialogForm.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your message" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full mt-4">
              Send Message
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
