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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import clsx from "clsx";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";

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
  const features = [
    {
      title: "✔️ Engagement Calculators",
      description:
        "Unlimited engagement searches for Instagram, TikTok, X(Twitter), Facebook, YouTube, and Twitch",
    },
    {
      title: "✔️ Social Media Auditors",
      description:
        "Unlimited audits for Instagram, TikTok, and YouTube accounts",
    },
    {
      title: "✔️ Brand Mentions",
      description:
        "Unlimited projects and keyword monitoring for the entire web",
    },
    {
      title: "✔️ Influencer Directory",
      description: "Search and contact over 100,000 influencers",
    },
    {
      title: "✔️ Engagement Calculator Manager",
      description: "Create informative lists for your social campaigns",
    },
    {
      title: "✔️ Campaign Manager",
      description: "Manage all your social media campaigns",
    },
    {
      title: "✔️ Competitor Tracker",
      description:
        "Compare statistics of your competitors with simplified graphs",
    },
    {
      title: "✔️ Collaborations",
      description: "Post and respond to other brands and influencers' posts",
    },
    {
      title: "✔️ Contracts",
      description: "Generate unlimited contracts for your influencer campaigns",
    },
    {
      title: "✔️ Dedicated user accounts",
      description: "Unlimited access to Phlanx Complete",
    },
    { title: "✔️ Free 30 days trial", description: "" },
  ];

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
          <div className="flex justify-between mt-4 gap-2">
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
  const categories = [
    "Beauty",
    "Beverage",
    "Business",
    "Entertainment",
    "Family",
    "Fashion",
    "Fitness",
    "Food",
    "Health",
    "Home",
    "Lifestyle",
    "Technology",
    "Other",
  ];
  const handleCheckboxChange = (category: string, checked: boolean) => {
    if (checked) {
      // Add the category to the list if checked
      setCheckedCategories((prev) => [...prev, category]);
    } else {
      // Remove the category from the list if unchecked
      setCheckedCategories((prev) =>
        prev.filter((checkedCategory) => checkedCategory !== category)
      );
    }
  };

  return (
    <div>
      <h4>Categories</h4>
      {categories.map((category) => (
        <div key={category} className="items-center flex gap-2">
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
  const locations = [
    "N/A",
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo, Democratic Republic of the",
    "Congo, Republic of the",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea, North",
    "Korea, South",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  return (
    <div>
      <h4>Location</h4>
      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
        <SelectTrigger>
          <SelectValue placeholder="Select a location" />
        </SelectTrigger>
        <SelectContent>
          {locations.map((location) => (
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
  const types = [
    "N/A",
    "Brand to Brand Collaboration",
    "Editorial Opportunity",
    "Event Opportunities",
    "I'm an Influencer looking for...",
    "I'm offering product or service in exchange for...",
    "Sponsorships",
    "Product Call",
    "Other",
  ];

  return (
    <div>
      <h4>Type</h4>
      <Select value={selectedType} onValueChange={setSelectedType}>
        <SelectTrigger>
          <SelectValue placeholder="Select a type" />
        </SelectTrigger>
        <SelectContent>
          {types.map((type) => (
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
  const reimbursements = ["Free Product", "Paid", "Unpaid"];

  const handleCheckboxChange = (reimbursement: string, checked: boolean) => {
    if (checked) {
      // Add the category to the list if checked
      setCheckedReimbursments((prev) => [...prev, reimbursement]);
    } else {
      // Remove the category from the list if unchecked
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
      {reimbursements.map((reimbursement) => (
        <div key={reimbursement} className="items-center flex gap-2">
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
  const dummyData = [
    {
      id: 1,
      name: "Jennifer Maldonado",
      date: 1695945600,
      company: "Jennifer Maldonado",
      contact: "Jennifer Maldonado",
      location: ["United States"],
      link: "https://example.com/jennifer",
      reimbursement: "Paid",
      budget: 100,
      type: "I'm an influencer looking for...",
      description:
        "Jennifer Maldonado is a vibrant US-based influencer with a growing community of 36k followers. She captivates her audience by blending product showcases with heartfelt glimpses into her life with her family.",
      email: "jennifer@example.com",
    },
    {
      id: 2,
      name: "Kris PR",
      date: 1690848000,
      company: "Kris PR",
      contact: "Kris PR",
      location: ["United States", "United Kingdom", "Australia"],
      link: null,
      reimbursement: "Paid",
      budget: 0,
      type: "Brand to Brand Collaboration",
      description:
        "Kellog Company is bringing more snacks to sporting events. For large partnership requests or collaborations, contact Kris PR.",
      email: "kris@kellogs.com",
    },
    {
      id: 3,
      name: "Mehmet",
      date: 1690848000,
      company: "Tuiste LLC",
      contact: null,
      location: ["United States"],
      link: "https://example.com/tuiste",
      reimbursement: "Paid",
      budget: 200,
      type: "I'm an influencer looking for...",
      description:
        "Tuiste LLC specializes in personalized name puzzles for babies. Mehmet seeks collaboration with influencers to promote these products.",
      email: "mehmet@tuiste.com",
    },
    {
      id: 4,
      name: "Jeremie Dende",
      date: 1696118400,
      company: "Jeremie Dende",
      contact: "Jeremie Dende",
      location: [
        "Belgium",
        "France",
        "Denmark",
        "Netherlands",
        "United Kingdom",
        "Switzerland",
      ],
      link: null,
      reimbursement: "Free Product",
      budget: null,
      type: "Sponsorships",
      description:
        "A four-day festival in Val d'Isère in April 2025, celebrating culture, adventure, and entertainment.",
      email: "jeremie@hidden.com",
    },
    {
      id: 5,
      name: "Sophia Sterling",
      date: 1695945600,
      company: "Waist Shakers",
      contact: "Sophia Sterling",
      location: ["United States"],
      link: "https://example.com/shakeitoff",
      reimbursement: "Free Product",
      budget: null,
      type: "I'm offering product or service in exchange for...",
      description:
        "Earn 20% commission through a unique referral link as part of a campaign with over 40 million reach.",
      email: "sophia@waistshakers.com",
    },
  ];

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
              <CardHeader>
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
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
