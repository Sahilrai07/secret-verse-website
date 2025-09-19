import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  User,
  Calendar,
  MapPin,
  Globe,
  BadgeCheck,
  Coins,
  Shield,
  Building2,
  Landmark,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

const getUserDataById = async (userId: string) => {
  const data = await prisma.user.findUnique({ where: { id: userId } });
  if (!data) notFound();
  return data;
};

// Single Info Row
const InfoRow = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | null;
  icon: React.ReactNode;
}) => (
  <div className="flex items-start gap-3">
    <div className="text-muted-foreground mt-1">{icon}</div>
    <div>
      <p className="text-xs uppercase text-muted-foreground mb-1">{label}</p>
      <p className="font-medium">
        {value ?? (
          <span className="italic text-muted-foreground">Not Provided</span>
        )}
      </p>
    </div>
  </div>
);

// Section with title and responsive layout
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-4">
    <h3 className="text-md font-semibold text-muted-foreground">{title}</h3>
    {/* Responsive grid: 1 column on phones, 2 on small+ */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{children}</div>
    <hr className="border-border" />
  </div>
);

const AdminDashboardUsersViewDetailsPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const userId = params.id;
  if (!userId) notFound();

  const user = await getUserDataById(userId);
  const {
    name,
    email,
    phone,
    gender,
    address,
    city,
    state,
    country,
    dateOfBirth,
    role,
    isVerified,
    coinBalance,
    createdAt,
  } = user;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header with Back button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">User Details</h1>
          <p className="text-sm text-muted-foreground">
            View full profile information
          </p>
        </div>
        <Link href="/admin/dashboard/users  ">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
      </div>

      {/* Main User Card */}
      <Card className="shadow-md border border-border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl">Profile Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 text-sm">
          <Section title="Basic Information">
            <InfoRow label="Name" value={name} icon={<User size={18} />} />
            <InfoRow label="Role" value={role} icon={<Shield size={18} />} />
            <InfoRow
              label="Date of Birth"
              value={dateOfBirth ? format(new Date(dateOfBirth), "dd MMM yyyy") : null}
              icon={<Calendar size={18} />}
            />
            <InfoRow
              label="Verified"
              value={isVerified ? "Yes" : "No"}
              icon={<BadgeCheck size={18} />}
            />
          </Section>

          <Section title="Contact Information">
            <InfoRow label="Email" value={email} icon={<Mail size={18} />} />
            <InfoRow label="Phone" value={phone} icon={<Phone size={18} />} />
          </Section>

          <Section title="Address Information">
            <InfoRow label="Address" value={address} icon={<MapPin size={18} />} />
            <InfoRow label="City" value={city} icon={<Building2 size={18} />} />
            <InfoRow label="State" value={state} icon={<Landmark size={18} />} />
            <InfoRow label="Country" value={country} icon={<Globe size={18} />} />
          </Section>

          <Section title="Other">
            <InfoRow
              label="Coin Balance"
              value={coinBalance.toString()}
              icon={<Coins size={18} />}
            />
            <InfoRow
              label="Account Created"
              value={format(new Date(createdAt), "dd MMM yyyy")}
              icon={<Calendar size={18} />}
            />
          </Section>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardUsersViewDetailsPage;
