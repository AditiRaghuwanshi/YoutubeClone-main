import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Channel from "./models/Channel.js";
import Video from "./models/Video.js";
import Comment from "./models/Comment.js";

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding...");

    await Comment.deleteMany({});
    await Video.deleteMany({});
    await Channel.deleteMany({});
    await User.deleteMany({});
    console.log("Cleared existing data.");

    const hashedPassword = await bcrypt.hash("password1234", 10);

    // ── Users ──────────────────────────────────────────────────────────────────
    const users = await User.create([
      {
        username: "MayankJoshi",
        email: "mayank@example.com",
        password: hashedPassword,
        avatar: "https://ui-avatars.com/api/?name=Mayank+Joshi&background=0f172a&color=fff&size=128",
      },
      {
        username: "HimEeshMadaan",
        email: "himeesh@example.com",
        password: hashedPassword,
        avatar: "https://ui-avatars.com/api/?name=Himeesh+Madaan&background=7c3aed&color=fff&size=128",
      },
      {
        username: "SamayRaina",
        email: "samay@example.com",
        password: hashedPassword,
        avatar: "https://ui-avatars.com/api/?name=Samay+Raina&background=dc2626&color=fff&size=128",
      },
    ]);
    console.log("Users created.");

    // ── Channels ───────────────────────────────────────────────────────────────
    const channels = await Channel.create([
      {
        channelName: "Mayank Joshi",
        owner: users[0]._id,
        description: "DSA, coding interviews, system design — from 0 to cracking FAANG. Real journey, real tips.",
        channelBanner: "https://placehold.co/1200x300/0f172a/FFFFFF?text=Mayank+Joshi",
        subscribers: 11800,
      },
      {
        channelName: "Him-eesh Madaan",
        owner: users[1]._id,
        description: "Motivation, mindset and personal development. Notice the world like never before.",
        channelBanner: "https://placehold.co/1200x300/7c3aed/FFFFFF?text=Him-eesh+Madaan",
        subscribers: 8510000,
      },
      {
        channelName: "Hindi Rush",
        owner: users[2]._id,
        description: "Hindi podcasts, celebrity interviews and Bollywood stories. Real talks, no filter.",
        channelBanner: "https://placehold.co/1200x300/dc2626/FFFFFF?text=Hindi+Rush",
        subscribers: 1200000,
      },
    ]);
    console.log("Channels created.");

    await User.findByIdAndUpdate(users[0]._id, { channel: channels[0]._id });
    await User.findByIdAndUpdate(users[1]._id, { channel: channels[1]._id });
    await User.findByIdAndUpdate(users[2]._id, { channel: channels[2]._id });

    // ── Videos — ALL IDs directly from user-provided links ────────────────────
    const videosData = [
      // ── From user links ───────────────────────────────────────────────────
      {
        title: "If DSA Feels Hard, Watch this",
        description: "From 0 DSA knowledge to cracking coding interviews at Microsoft. A real journey explained simply.",
        videoUrl: "https://www.youtube.com/embed/dN43ob4E5QY",
        thumbnailUrl: "https://img.youtube.com/vi/dN43ob4E5QY/maxresdefault.jpg",
        category: "Education",
        channel: channels[0]._id,
        uploader: users[0]._id,
        views: 38000,
      },
      {
        title: "Notice The World Like Never Before",
        description: "Him-eesh Madaan's powerful motivational video on changing your perspective on life.",
        videoUrl: "https://www.youtube.com/embed/R03jKvxzJYw",
        thumbnailUrl: "https://img.youtube.com/vi/R03jKvxzJYw/maxresdefault.jpg",
        category: "Education",
        channel: channels[1]._id,
        uploader: users[1]._id,
        views: 218000,
      },
      {
        title: "Rakhi Sawant EXPOSES Bollywood ft. Samay Raina | Podcast",
        description: "Rakhi Sawant opens up about Salman Khan, Farah Khan, Bigg Boss, her mother's passing and life in Dubai.",
        videoUrl: "https://www.youtube.com/embed/O0CuYUQHoaU",
        thumbnailUrl: "https://img.youtube.com/vi/O0CuYUQHoaU/maxresdefault.jpg",
        category: "Entertainment",
        channel: channels[2]._id,
        uploader: users[2]._id,
        views: 1700000,
      },
      {
        title: "Sanwariyo Hai Seth - Mhari Radha Ji Sethani Hai | Pujya Shri Indresh Ji Maharaj",
        description: "Beautiful Krishna bhajan by Pujya Shri Indresh Ji Maharaj from BhaktiPath.",
        videoUrl: "https://www.youtube.com/embed/EeSxroU37-0",
        thumbnailUrl: "https://img.youtube.com/vi/EeSxroU37-0/maxresdefault.jpg",
        category: "Music",
        channel: channels[1]._id,
        uploader: users[1]._id,
        views: 129000,
      },
      {
        title: "Sam Altman Shows Me GPT-5... And What's Next",
        description: "Cleo Abram gets exclusive access to Sam Altman to discuss GPT-5 and the future of AI.",
        videoUrl: "https://www.youtube.com/embed/LdlLUogNYMw",
        thumbnailUrl: "https://img.youtube.com/vi/LdlLUogNYMw/maxresdefault.jpg",
        category: "Science & Tech",
        channel: channels[0]._id,
        uploader: users[0]._id,
        views: 2900000,
      },
      {
        title: "Master Web Animations in 2 Hours | Build an Awwwards-Level Website",
        description: "JavaScript Mastery teaches you to build stunning web animations from scratch in just 2 hours.",
        videoUrl: "https://www.youtube.com/embed/AW1yfBKRMKc",
        thumbnailUrl: "https://img.youtube.com/vi/AW1yfBKRMKc/maxresdefault.jpg",
        category: "Education",
        channel: channels[0]._id,
        uploader: users[0]._id,
        views: 1000000,
      },
      {
        title: "Becoming Smart Is Easy, Actually",
        description: "A surprisingly practical guide to becoming smarter — simple habits that actually work.",
        videoUrl: "https://www.youtube.com/embed/C5OJJD3Eytk",
        thumbnailUrl: "https://img.youtube.com/vi/C5OJJD3Eytk/maxresdefault.jpg",
        category: "Education",
        channel: channels[1]._id,
        uploader: users[1]._id,
        views: 608000,
      },
      {
        title: "Arctic Monkeys - I Wanna Be Yours (Session Acoustique OÜI FM)",
        description: "Arctic Monkeys perform 'I Wanna Be Yours' in an intimate acoustic session for OÜI FM, Sept 2013.",
        videoUrl: "https://www.youtube.com/embed/7i2gb3dJ6ik",
        thumbnailUrl: "https://img.youtube.com/vi/7i2gb3dJ6ik/maxresdefault.jpg",
        category: "Music",
        channel: channels[2]._id,
        uploader: users[2]._id,
        views: 13000000,
      },
      {
        title: "Arctic Monkeys - Do I Wanna Know? (Live)",
        description: "Official live performance of 'Do I Wanna Know?' by Arctic Monkeys.",
        videoUrl: "https://www.youtube.com/embed/1tWFk8ojF4M",
        thumbnailUrl: "https://img.youtube.com/vi/1tWFk8ojF4M/maxresdefault.jpg",
        category: "Music",
        channel: channels[2]._id,
        uploader: users[2]._id,
        views: 45000000,
      },
      {
        title: "Master Web Dev in 2 Hours | DU--Q06ftiw",
        description: "Comprehensive full-stack web development crash course — from basics to deployment.",
        videoUrl: "https://www.youtube.com/embed/DU--Q06ftiw",
        thumbnailUrl: "https://img.youtube.com/vi/DU--Q06ftiw/maxresdefault.jpg",
        category: "Education",
        channel: channels[0]._id,
        uploader: users[0]._id,
        views: 320000,
      },
      {
        title: "1ypaWUvvIj4 | Motivational Talk",
        description: "A powerful motivational session on mindset, focus and achieving your goals.",
        videoUrl: "https://www.youtube.com/embed/1ypaWUvvIj4",
        thumbnailUrl: "https://img.youtube.com/vi/1ypaWUvvIj4/maxresdefault.jpg",
        category: "Education",
        channel: channels[1]._id,
        uploader: users[1]._id,
        views: 150000,
      },
      {
        title: "hmtuvNfytjM | Featured Talk",
        description: "An engaging talk on life, learning and growing beyond your comfort zone.",
        videoUrl: "https://www.youtube.com/embed/hmtuvNfytjM",
        thumbnailUrl: "https://img.youtube.com/vi/hmtuvNfytjM/maxresdefault.jpg",
        category: "Education",
        channel: channels[1]._id,
        uploader: users[1]._id,
        views: 200000,
      },
      {
        title: "BTz1r0jzl0M | Coding & Tech Talk",
        description: "Deep dive into coding concepts, tools and tech career tips for developers.",
        videoUrl: "https://www.youtube.com/embed/BTz1r0jzl0M",
        thumbnailUrl: "https://img.youtube.com/vi/BTz1r0jzl0M/maxresdefault.jpg",
        category: "Science & Tech",
        channel: channels[0]._id,
        uploader: users[0]._id,
        views: 95000,
      },
      {
        title: "DXVHmGoCTco | Dev Tutorial",
        description: "Step-by-step developer tutorial covering modern web technologies and best practices.",
        videoUrl: "https://www.youtube.com/embed/DXVHmGoCTco",
        thumbnailUrl: "https://img.youtube.com/vi/DXVHmGoCTco/maxresdefault.jpg",
        category: "Education",
        channel: channels[0]._id,
        uploader: users[0]._id,
        views: 180000,
      },
    
    ];

    const videos = await Video.create(videosData);
    console.log("Videos created.");

    for (const video of videos) {
      await Channel.findByIdAndUpdate(video.channel, {
        $push: { videos: video._id },
      });
    }

    // ── Comments ───────────────────────────────────────────────────────────────
    await Comment.create([
      {
        video: videos[0]._id,
        user: users[1]._id,
        text: "Bhai ye video dekh ke mujhe bhi DSA start karne ka mann kar gaya. Thanks for sharing your journey!",
      },
      {
        video: videos[0]._id,
        user: users[2]._id,
        text: "Microsoft crack kiya bhai? Respect! Ye video bohot zaruri hai har coder ke liye.",
      },
      {
        video: videos[1]._id,
        user: users[0]._id,
        text: "Him-eesh sir ki videos ke baad zindagi dekhne ka nazar hi badal gaya. Pure gold content.",
      },
      {
        video: videos[2]._id,
        user: users[0]._id,
        text: "Samay bhai aur Rakhi Sawant ka combo — unexpected but absolutely hilarious and real!",
      },
      {
        video: videos[2]._id,
        user: users[1]._id,
        text: "Rakhi ne toh sab expose kar diya. Hindi Rush ka ye podcast 🔥🔥🔥",
      },
      {
        video: videos[4]._id,
        user: users[1]._id,
        text: "GPT-5 ka future sunke mind blown ho gaya. AI is moving insanely fast!",
      },
      {
        video: videos[6]._id,
        user: users[2]._id,
        text: "JS Mastery ka tutorial dekh ke mere animations game hi badal gaya. Must watch for devs!",
      },
      {
        video: videos[7]._id,
        user: users[0]._id,
        text: "Finally a video that makes sense. Becoming smart really is easier than we think.",
      },
      {
        video: videos[8]._id,
        user: users[1]._id,
        text: "Arctic Monkeys acoustic sessions are always on another level. Pure music.",
      },
      {
        video: videos[9]._id,
        user: users[2]._id,
        text: "Do I Wanna Know live is just chef's kiss. One of the best live performances ever.",
      },
    ]);
    console.log("Comments created.");

    // ── Likes ──────────────────────────────────────────────────────────────────
    await Video.findByIdAndUpdate(videos[0]._id, { likes: [users[1]._id, users[2]._id] });
    await Video.findByIdAndUpdate(videos[1]._id, { likes: [users[0]._id, users[2]._id] });
    await Video.findByIdAndUpdate(videos[2]._id, { likes: [users[0]._id, users[1]._id] });
    await Video.findByIdAndUpdate(videos[6]._id, { likes: [users[1]._id, users[2]._id] });
    await Video.findByIdAndUpdate(videos[9]._id, { likes: [users[0]._id, users[1]._id, users[2]._id] });

    console.log("\n✅ Database seeded successfully!");
    console.log(`Users    : ${users.length}`);
    console.log(`Channels : ${channels.length}`);
    console.log(`Videos   : ${videos.length}`);
    console.log("\nLogin credentials (password: password1234 for all):");
    console.log("mayank@example.com  → Mayank Joshi");
    console.log("himeesh@example.com → Him-eesh Madaan");
    console.log("samay@example.com   → Hindi Rush");

    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDB();