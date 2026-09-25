import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const artisanImages = {
  "خزاف عراقي": "/images/artisans/potter.jpg",
  "نجار عراقي": "/images/artisans/carpenter.jpg",
  "خياط عراقي": "/images/artisans/tailor.jpg",
  "صانع سعف عراقي": "/images/artisans/palm-artisan.jpg",
  "مطرزة عراقية": "/images/artisans/embroiderer.jpg",
  "صانع نحاس عراقي": "/images/artisans/coppersmith.jpg",
};

function Profile() {
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const artisanId = 2;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/artisans/${artisanId}`
        );

        setArtisan(response.data.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const profileImage =
    artisanImages[artisan?.craft_name] ||
    artisan?.profile_image ||
    null;

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FDF0D5] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl animate-pulse">
          <div className="h-10 w-48 rounded-xl bg-[#003049]/15" />

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            <div className="h-96 rounded-3xl bg-white/70 shadow-md" />

            <div className="space-y-5 rounded-3xl bg-white/70 p-8 shadow-md lg:col-span-2">
              <div className="h-8 w-64 rounded bg-[#003049]/15" />
              <div className="h-20 rounded bg-[#669BBC]/10" />
              <div className="h-16 rounded bg-[#669BBC]/10" />
              <div className="h-16 rounded bg-[#669BBC]/10" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FDF0D5] px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
          <div className="mb-4 text-5xl">⚠️</div>

          <h1 className="text-2xl font-bold text-[#003049]">
            Something went wrong
          </h1>

          <p className="mt-3 text-[#669BBC]">
            {error}
          </p>

          <Link
            to="/artisan/dashboard"
            className="mt-6 inline-block rounded-xl bg-[#780000] px-6 py-3 font-semibold text-[#FDF0D5] transition-all duration-300 hover:-translate-y-1 hover:bg-[#C1121F] hover:shadow-lg"
          >
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  if (!artisan) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FDF0D5] px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
          <div className="mb-4 text-5xl">🔎</div>

          <h1 className="text-2xl font-bold text-[#003049]">
            Profile not found
          </h1>

          <p className="mt-3 text-[#669BBC]">
            We could not find your artisan profile.
          </p>

          <Link
            to="/artisan/dashboard"
            className="mt-6 inline-block rounded-xl bg-[#780000] px-6 py-3 font-semibold text-[#FDF0D5] transition-all duration-300 hover:-translate-y-1 hover:bg-[#C1121F] hover:shadow-lg"
          >
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDF0D5]">
      {/* Header */}
      <section className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#669BBC]/10" />
        <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#780000]/5" />

        <div className="relative mx-auto max-w-6xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#780000]">
                Artisan Workspace
              </p>

              <h1 className="mt-3 text-4xl font-bold text-[#003049] sm:text-5xl">
                My Profile
              </h1>

              <p className="mt-3 text-lg text-[#669BBC]">
                View your artisan information and professional details.
              </p>
            </div>

            <Link
              to="/artisan/dashboard"
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#003049]/15 bg-white px-5 py-3 font-semibold text-[#003049] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <span>←</span>
              Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-3">

            {/* Profile Image Card */}
            <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
              <div className="group relative h-80 overflow-hidden bg-[#669BBC]">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={artisan.craft_name || "Artisan"}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#669BBC] to-[#003049]">
                    <div className="text-center">
                      <div className="text-7xl">🧑‍🎨</div>

                      <p className="mt-4 font-semibold text-[#FDF0D5]">
                        Alherfa Artisan
                      </p>
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#003049]/60 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-[#780000] shadow-lg backdrop-blur-sm">
                  ✦ Artisan
                </div>
              </div>

              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#780000]">
                  Craft
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#003049]">
                  {artisan.craft_name || "Handmade Artisan"}
                </h2>

                <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#FDF0D5] p-4">
                  <div className="text-2xl">📍</div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#669BBC]">
                      Location
                    </p>

                    <p className="mt-1 font-semibold text-[#003049]">
                      {artisan.city || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="rounded-3xl bg-white p-7 shadow-xl sm:p-9 lg:col-span-2">
              <div className="flex flex-col gap-3 border-b border-[#669BBC]/15 pb-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#780000]">
                    Profile Information
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-[#003049]">
                    {artisan.craft_name || "My Artisan Profile"}
                  </h2>
                </div>

                <div className="rounded-full bg-[#FDF0D5] px-4 py-2 text-sm font-semibold text-[#780000]">
                  Artisan Account
                </div>
              </div>

              {/* Bio */}
              <div className="mt-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDF0D5] text-xl">
                    ✍️
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#669BBC]">
                      About
                    </p>

                    <h3 className="font-bold text-[#003049]">
                      Biography
                    </h3>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-[#FDF0D5] p-5">
                  <p className="leading-8 text-[#003049]/80">
                    {artisan.bio ||
                      "No bio available. Add information about your craft and experience."}
                  </p>
                </div>
              </div>

              {/* Information Grid */}
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#669BBC]/15 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FDF0D5] text-xl">
                      📍
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#669BBC]">
                        City
                      </p>

                      <p className="mt-1 font-bold text-[#003049]">
                        {artisan.city || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#669BBC]/15 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FDF0D5] text-xl">
                      ✦
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#669BBC]">
                        Experience
                      </p>

                      <p className="mt-1 font-bold text-[#003049]">
                        {artisan.experience_years ?? 0} years
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-8 border-t border-[#669BBC]/15 pt-7">
                <p className="mb-4 text-sm font-bold uppercase tracking-wider text-[#669BBC]">
                  Manage Your Workspace
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Link
                    to="/artisan/products"
                    className="group flex items-center justify-between rounded-xl bg-[#FDF0D5] px-5 py-4 font-semibold text-[#003049] transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <span className="flex items-center gap-3">
                      <span>🧺</span>
                      My Products
                    </span>

                    <span className="text-[#780000] transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>

                  <Link
                    to="/artisan/orders"
                    className="group flex items-center justify-between rounded-xl bg-[#FDF0D5] px-5 py-4 font-semibold text-[#003049] transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <span className="flex items-center gap-3">
                      <span>📦</span>
                      My Orders
                    </span>

                    <span className="text-[#780000] transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 rounded-3xl bg-[#003049] p-7 shadow-xl sm:p-9">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#669BBC]">
                  Grow Your Store
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#FDF0D5] sm:text-3xl">
                  Add more handmade products
                </h2>

                <p className="mt-2 max-w-2xl leading-7 text-[#FDF0D5]/70">
                  Keep your marketplace collection fresh by adding your latest
                  handmade creations.
                </p>
              </div>

              <Link
                to="/artisan/products/add"
                className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-[#780000] px-6 py-3 font-semibold text-[#FDF0D5] transition-all duration-300 hover:-translate-y-1 hover:bg-[#C1121F] hover:shadow-lg"
              >
                <span className="text-xl">+</span>
                Add Product
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Profile;