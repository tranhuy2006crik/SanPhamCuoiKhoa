import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Movie from './models/Movie.js';

dotenv.config();

const extraMovies = [
    {
        title: "Avatar: The Way of Water",
        rating: 7.6,
        totalrating: 450000,
        description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.",
        image: "https://image.tmdb.org/t/p/w500/t6Sna4v9S6JS4vgUnSBD9zSHe34.jpg",
        releaseDate: "2022-12-16",
        duration: 192,
        genres: "Action, Adventure, Sci-Fi",
        videoUrl: "https://www.youtube.com/watch?v=d9MyW72ELq0"
    },
    {
        title: "The Super Mario Bros. Movie",
        rating: 7.1,
        totalrating: 280000,
        description: "The story of The Super Mario Bros. on their journey through the Mushroom Kingdom.",
        image: "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThr6VMB6mU21wS1Z.jpg",
        releaseDate: "2023-04-05",
        duration: 92,
        genres: "Animation, Adventure, Comedy",
        videoUrl: "https://www.youtube.com/watch?v=TnGl01FkMMo"
    },
    {
        title: "Spider-Man: Across the Spider-Verse",
        rating: 8.7,
        totalrating: 320000,
        description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
        image: "https://image.tmdb.org/t/p/w500/8VtB9m91SpxI6Gjo9mZUR6BPMY5.jpg",
        releaseDate: "2023-06-02",
        duration: 140,
        genres: "Animation, Action, Adventure",
        videoUrl: "https://www.youtube.com/watch?v=shW9i6k8cB0"
    },
    {
        title: "John Wick: Chapter 4",
        rating: 7.7,
        totalrating: 250000,
        description: "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.",
        image: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7Vk6set85QN4.jpg",
        releaseDate: "2023-03-24",
        duration: 169,
        genres: "Action, Crime, Thriller",
        videoUrl: "https://www.youtube.com/watch?v=qEVUtrk8_B4"
    },
    {
        title: "Guardians of the Galaxy Vol. 3",
        rating: 7.9,
        totalrating: 290000,
        description: "Still reeling from the loss of Gamora, Peter Quill rallies his team around him to defend the universe along with protecting one of their own. A mission that, if not completed successfully, could quite possibly lead to the end of the Guardians as we know them.",
        image: "https://image.tmdb.org/t/p/w500/r2J0vUsesmS3M6fiuBnmB176zST.jpg",
        releaseDate: "2023-05-05",
        duration: 150,
        genres: "Action, Adventure, Comedy",
        videoUrl: "https://www.youtube.com/watch?v=u3V5KDHRQvk"
    },
    {
        title: "The Flash",
        rating: 6.7,
        totalrating: 180000,
        description: "Barry Allen uses his super speed to change the past, but his attempt to save his family creates a world without super heroes, forcing him to race for his life in order to save the future.",
        image: "https://image.tmdb.org/t/p/w500/rktDFPzHwy79bbU9nkqs2ki3jdy.jpg",
        releaseDate: "2023-06-16",
        duration: 144,
        genres: "Action, Adventure, Sci-Fi",
        videoUrl: "https://www.youtube.com/watch?v=hebWYacbdvc"
    },
    {
        title: "Elemental",
        rating: 7.0,
        totalrating: 150000,
        description: "Follows Ember and Wade, in a city where fire-, water-, land- and air-residents live together.",
        image: "https://image.tmdb.org/t/p/w500/4Y9HpkEE69vSTB0o6CU9t9p9vU6.jpg",
        releaseDate: "2023-06-16",
        duration: 101,
        genres: "Animation, Adventure, Comedy",
        videoUrl: "https://www.youtube.com/watch?v=hXzcyx9V0xw"
    },
    {
        title: "Indiana Jones and the Dial of Destiny",
        rating: 6.6,
        totalrating: 120000,
        description: "Archaeologist Indiana Jones races against time to retrieve a legendary artifact that can change the course of history.",
        image: "https://image.tmdb.org/t/p/w500/Af49PbeTJJofmAI6tBJAa9sJvTX.jpg",
        releaseDate: "2023-06-30",
        duration: 154,
        genres: "Action, Adventure",
        videoUrl: "https://www.youtube.com/watch?v=eQfMbSe7F2g"
    },
    {
        title: "Mission: Impossible - Dead Reckoning Part One",
        rating: 7.8,
        totalrating: 140000,
        description: "Ethan Hunt and his IMF team must track down a dangerous new weapon that threatens all of humanity before it falls into the wrong hands.",
        image: "https://image.tmdb.org/t/p/w500/NNxpe91uWp6GZ9YIuSdh6X976V.jpg",
        releaseDate: "2023-07-12",
        duration: 163,
        genres: "Action, Adventure, Thriller",
        videoUrl: "https://www.youtube.com/watch?v=avz06PDqDbM"
    },
    {
        title: "Transformers: Rise of the Beasts",
        rating: 6.1,
        totalrating: 110000,
        description: "Returning to the action and spectacle that have captured moviegoers around the world, Transformers: Rise of the Beasts will take audiences on a '90s globetrotting adventure with the Autobots and introduce a whole new faction of Transformer – the Maximals – to join them as allies in the existing battle for earth.",
        image: "https://image.tmdb.org/t/p/w500/gPbM0MKwsVv4a4pIqI9nvvbpS6e.jpg",
        releaseDate: "2023-06-09",
        duration: 127,
        genres: "Action, Adventure, Sci-Fi",
        videoUrl: "https://www.youtube.com/watch?v=itnqEauWQZM"
    },
    {
        title: "Fast X",
        rating: 5.8,
        totalrating: 160000,
        description: "Dom Toretto and his family are targeted by the vengeful son of drug kingpin Hernan Reyes.",
        image: "https://image.tmdb.org/t/p/w500/fiVW0v3U7zWpX9o4MibZp0ThoAF.jpg",
        releaseDate: "2023-05-19",
        duration: 141,
        genres: "Action, Crime, Thriller",
        videoUrl: "https://www.youtube.com/watch?v=32RAq6JzY-w"
    },
    {
        title: "The Little Mermaid",
        rating: 7.2,
        totalrating: 130000,
        description: "A young mermaid makes a deal with a sea witch to trade her beautiful voice for human legs so she can discover the world above water and impress a prince.",
        image: "https://image.tmdb.org/t/p/w500/ym1ZxyqwV0uXfb96H6C3BhH9Bv7.jpg",
        releaseDate: "2023-05-26",
        duration: 135,
        genres: "Adventure, Family, Fantasy",
        videoUrl: "https://www.youtube.com/watch?v=kpGo2_dKoE"
    },
    {
        title: "Evil Dead Rise",
        rating: 6.6,
        totalrating: 95000,
        description: "A twisted tale of two estranged sisters whose reunion is cut short by the rise of flesh-possessing demons, thrusting them into a primal battle for survival as they face the most nightmarish version of family imaginable.",
        image: "https://image.tmdb.org/t/p/w500/mIBG7InLoguS4997v8mGZ6J9zUv.jpg",
        releaseDate: "2023-04-21",
        duration: 96,
        genres: "Horror, Fantasy",
        videoUrl: "https://www.youtube.com/watch?v=smTK_AeAPHs"
    },
    {
        title: "Scream VI",
        rating: 6.5,
        totalrating: 88000,
        description: "In the next installment, the survivors of the Ghostface killings leave Woodsboro behind and start a fresh chapter in New York City.",
        image: "https://image.tmdb.org/t/p/w500/8Gl696X97S679SfcY9X73K7v2.jpg",
        releaseDate: "2023-03-10",
        duration: 122,
        genres: "Horror, Mystery, Thriller",
        videoUrl: "https://www.youtube.com/watch?v=h74AXqw4Opc"
    },
    {
        title: "Dungeons & Dragons: Honor Among Thieves",
        rating: 7.3,
        totalrating: 105000,
        description: "A charming thief and a band of unlikely adventurers embark on an epic heist to retrieve a lost relic, but things go dangerously awry when they run afoul of the wrong people.",
        image: "https://image.tmdb.org/t/p/w500/66986vS8n63vP97Y3Yv4zW9B7Wv.jpg",
        releaseDate: "2023-03-31",
        duration: 134,
        genres: "Action, Adventure, Fantasy",
        videoUrl: "https://www.youtube.com/watch?v=IiMinixSXII"
    },
    {
        title: "Creed III",
        rating: 6.8,
        totalrating: 75000,
        description: "Adonis has been thriving in both his career and family life, but when a childhood friend and former boxing prodigy resurfaces, the face-off is more than just a fight.",
        image: "https://image.tmdb.org/t/p/w500/cvsXjXOU6ofmJSvy99fS0Uv0oR.jpg",
        releaseDate: "2023-03-03",
        duration: 116,
        genres: "Drama, Sport",
        videoUrl: "https://www.youtube.com/watch?v=AHmCH7iB_IM"
    },
    {
        title: "Ant-Man and the Wasp: Quantumania",
        rating: 6.1,
        totalrating: 220000,
        description: "Scott Lang and Hope Van Dyne, along with Hank Pym and Janet Van Dyne, explore the Quantum Realm, where they interact with strange creatures and embark on an adventure that goes beyond the limits of what they thought was possible.",
        image: "https://image.tmdb.org/t/p/w500/ngl20oNicuBbcBvY1ujbs6BqwVi.jpg",
        releaseDate: "2023-02-17",
        duration: 124,
        genres: "Action, Adventure, Comedy",
        videoUrl: "https://www.youtube.com/watch?v=ZlNFpri-Y40"
    },
    {
        title: "Puss in Boots: The Last Wish",
        rating: 7.9,
        totalrating: 195000,
        description: "Puss in Boots discovers that his passion for adventure has taken its toll: he has burned through eight of his nine lives. Puss sets out on an epic journey to find the mythical Last Wish and restore his nine lives.",
        image: "https://image.tmdb.org/t/p/w500/kuf6evRbcS3UOAfu3Z3HqHUK69P.jpg",
        releaseDate: "2022-12-21",
        duration: 102,
        genres: "Animation, Adventure, Comedy",
        videoUrl: "https://www.youtube.com/watch?v=RqrXKwPNVme"
    },
    {
        title: "Top Gun: Maverick",
        rating: 8.3,
        totalrating: 650000,
        description: "After more than thirty years of service as one of the Navy's top aviators, Pete Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him.",
        image: "https://image.tmdb.org/t/p/w500/62HCnUTziyMC96wYvUaPZpViZld.jpg",
        releaseDate: "2022-05-27",
        duration: 130,
        genres: "Action, Drama",
        videoUrl: "https://www.youtube.com/watch?v=giXcoGa8nzo"
    },
    {
        title: "Everything Everywhere All at Once",
        rating: 7.8,
        totalrating: 480000,
        description: "A middle-aged Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes connecting with the lives she could have led.",
        image: "https://image.tmdb.org/t/p/w500/r9p9p7v5Mhp9HpjR9p9p7v5Mhp9.jpg",
        releaseDate: "2022-03-25",
        duration: 139,
        genres: "Action, Adventure, Comedy",
        videoUrl: "https://www.youtube.com/watch?v=wxN1T1uxQ2g"
    },
    {
        title: "The Batman",
        rating: 7.8,
        totalrating: 720000,
        description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
        image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36FpZ6p69786vS8n63.jpg",
        releaseDate: "2022-03-04",
        duration: 176,
        genres: "Action, Crime, Drama",
        videoUrl: "https://www.youtube.com/watch?v=mqqft22S8R8"
    },
    {
        title: "Dune",
        rating: 8.0,
        totalrating: 680000,
        description: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.",
        image: "https://image.tmdb.org/t/p/w500/d5N0unRiSFEfp6pSGsYArasNc4S.jpg",
        releaseDate: "2021-10-22",
        duration: 155,
        genres: "Action, Adventure, Sci-Fi",
        videoUrl: "https://www.youtube.com/watch?v=n9xhJrPXop4"
    },
    {
        title: "Oppenheimer",
        rating: 8.4,
        totalrating: 420000,
        description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
        image: "https://image.tmdb.org/t/p/w500/8Gxv3mYgiFAHUqvXo89vMvUNpY4.jpg",
        releaseDate: "2023-07-21",
        duration: 180,
        genres: "Biography, Drama, History",
        videoUrl: "https://www.youtube.com/watch?v=uYPbbksJxIg"
    },
    {
        title: "Barbie",
        rating: 6.9,
        totalrating: 380000,
        description: "Barbie suffers a crisis that leads her to question her world and her existence.",
        image: "https://image.tmdb.org/t/p/w500/iuFNmBTD0Atv4vT0C9QwoS6p3QT.jpg",
        releaseDate: "2023-07-21",
        duration: 114,
        genres: "Adventure, Comedy, Fantasy",
        videoUrl: "https://www.youtube.com/watch?v=pBk4NYhWNMM"
    },
    {
        title: "The Hunger Games: The Ballad of Songbirds & Snakes",
        rating: 6.8,
        totalrating: 120000,
        description: "Coriolanus Snow mentors and develops feelings for the female District 12 tribute during the 10th Hunger Games.",
        image: "https://image.tmdb.org/t/p/w500/mBaXZ95O9vSH9B5o3I9vMvUNpY4.jpg",
        releaseDate: "2023-11-17",
        duration: 157,
        genres: "Action, Adventure, Drama",
        videoUrl: "https://www.youtube.com/watch?v=RqrXKwPNVme"
    },
    {
        title: "Napoleon",
        rating: 6.4,
        totalrating: 85000,
        description: "An epic that details the checkered rise and fall of French Emperor Napoleon Bonaparte and his relentless journey to power through the prism of his addictive, volatile relationship with his one true love, Josephine.",
        image: "https://image.tmdb.org/t/p/w500/v9D9m91SpxI6Gjo9mZUR6BPMY5.jpg",
        releaseDate: "2023-11-22",
        duration: 158,
        genres: "Action, Biography, Drama",
        videoUrl: "https://www.youtube.com/watch?v=LInS-uIIno8"
    },
    {
        title: "Wonka",
        rating: 7.0,
        totalrating: 92000,
        description: "The story will focus specifically on a young Willy Wonka and how he met the Oompa-Loompas on one of his earliest adventures.",
        image: "https://image.tmdb.org/t/p/w500/qbaUnSBD9zSHe34.jpg",
        releaseDate: "2023-12-15",
        duration: 116,
        genres: "Adventure, Comedy, Family",
        videoUrl: "https://www.youtube.com/watch?v=otNh9s44LyA"
    },
    {
        title: "Aquaman and the Lost Kingdom",
        rating: 5.7,
        totalrating: 110000,
        description: "Arthur Curry must team up with his brother Orm to save the world from Black Manta.",
        image: "https://image.tmdb.org/t/p/w500/xXp69786vS8n63vP97Y3Yv4zW9B7Wv.jpg",
        releaseDate: "2023-12-22",
        duration: 124,
        genres: "Action, Adventure, Fantasy",
        videoUrl: "https://www.youtube.com/watch?v=2wcj6KrRw6A"
    },
    {
        title: "The Marvels",
        rating: 5.6,
        totalrating: 95000,
        description: "Carol Danvers gets her powers entangled with those of Kamala Khan and Monica Rambeau, forcing them to work together to save the universe.",
        image: "https://image.tmdb.org/t/p/w500/v9D9m91SpxI6Gjo9mZUR6BPMY5.jpg",
        releaseDate: "2023-11-10",
        duration: 105,
        genres: "Action, Adventure, Fantasy",
        videoUrl: "https://www.youtube.com/watch?v=wS_qbDztg8M"
    },
    {
        title: "Wish",
        rating: 5.6,
        totalrating: 68000,
        description: "A young girl named Asha wishes on a star and gets a more direct answer than she bargained for when a trouble-making star comes down from the sky to join her.",
        image: "https://image.tmdb.org/t/p/w500/v9D9m91SpxI6Gjo9mZUR6BPMY5.jpg",
        releaseDate: "2023-11-22",
        duration: 95,
        genres: "Animation, Adventure, Family",
        videoUrl: "https://www.youtube.com/watch?v=oyRxxpD3yNw"
    },
    {
        title: "Killers of the Flower Moon",
        rating: 7.7,
        totalrating: 145000,
        description: "When oil is discovered of 1920s Oklahoma under Osage Nation land, the Osage people are murdered one by one until the FBI steps in to unravel the mystery.",
        image: "https://image.tmdb.org/t/p/w500/v9D9m91SpxI6Gjo9mZUR6BPMY5.jpg",
        releaseDate: "2023-10-20",
        duration: 206,
        genres: "Crime, Drama, History",
        videoUrl: "https://www.youtube.com/watch?v=EG0si5bSd6I"
    },
    {
        title: "Taylor Swift: The Eras Tour",
        rating: 8.2,
        totalrating: 45000,
        description: "Experience the breathtaking Eras Tour concert, performed by Taylor Swift.",
        image: "https://image.tmdb.org/t/p/w500/v9D9m91SpxI6Gjo9mZUR6BPMY5.jpg",
        releaseDate: "2023-10-13",
        duration: 169,
        genres: "Music",
        videoUrl: "https://www.youtube.com/watch?v=KiedRPuAocI"
    },
    {
        title: "Five Nights at Freddy's",
        rating: 5.5,
        totalrating: 125000,
        description: "A troubled security guard begins working at Freddy Fazbear's Pizzeria. While spending his first night on the job, he realizes the night shift at Freddy's won't be so easy to make it through.",
        image: "https://image.tmdb.org/t/p/w500/v9D9m91SpxI6Gjo9mZUR6BPMY5.jpg",
        releaseDate: "2023-10-27",
        duration: 109,
        genres: "Horror, Mystery, Thriller",
        videoUrl: "https://www.youtube.com/watch?v=0VH9WCFV6XQ"
    },
    {
        title: "The Creator",
        rating: 6.8,
        totalrating: 105000,
        description: "Amidst a future war between the human race and the forces of artificial intelligence, Joshua, a hardened ex-special forces agent grieving the disappearance of his wife, is recruited to hunt down and kill the Creator, the elusive architect of advanced AI who has developed a mysterious weapon with the power to end the war-and mankind itself.",
        image: "https://image.tmdb.org/t/p/w500/v9D9m91SpxI6Gjo9mZUR6BPMY5.jpg",
        releaseDate: "2023-09-29",
        duration: 133,
        genres: "Action, Adventure, Sci-Fi",
        videoUrl: "https://www.youtube.com/watch?v=ex3C1-5Dhb8"
    },
    {
        title: "Saw X",
        rating: 6.6,
        totalrating: 82000,
        description: "A sick and desperate John Kramer travels to Mexico for a risky and experimental medical procedure in hopes of a miracle cure for his cancer only to discover the entire operation is a scam to defraud the most vulnerable.",
        image: "https://image.tmdb.org/t/p/w500/v9D9m91SpxI6Gjo9mZUR6BPMY5.jpg",
        releaseDate: "2023-09-29",
        duration: 118,
        genres: "Horror, Mystery, Thriller",
        videoUrl: "https://www.youtube.com/watch?v=t3PzUo4P21c"
    },
    {
        title: "A Haunting in Venice",
        rating: 6.5,
        totalrating: 78000,
        description: "In post-World War II Venice, Poirot, now retired and living in his own exile, reluctantly attends a seance. But when one of the guests is murdered, it is up to the former detective to once again uncover the killer.",
        image: "https://image.tmdb.org/t/p/w500/v9D9m91SpxI6Gjo9mZUR6BPMY5.jpg",
        releaseDate: "2023-09-15",
        duration: 103,
        genres: "Crime, Drama, Mystery",
        videoUrl: "https://www.youtube.com/watch?v=yedaMv5K_pE"
    },
    {
        title: "Expend4bles",
        rating: 4.8,
        totalrating: 65000,
        description: "Armed with every weapon they can get their hands on and the skills to use them, The Expendables are the world's last line of defense and the team that gets called when all other options are off the table.",
        image: "https://image.tmdb.org/t/p/w500/v9D9m91SpxI6Gjo9mZUR6BPMY5.jpg",
        releaseDate: "2023-09-22",
        duration: 103,
        genres: "Action, Adventure, Thriller",
        videoUrl: "https://www.youtube.com/watch?v=Dhla66oK7G4"
    },
    {
        title: "The Nun II",
        rating: 5.6,
        totalrating: 88000,
        description: "1956 - France. A priest is murdered. An evil is spreading. The sequel to the worldwide smash hit follows Sister Irene as she once again comes face-to-face with Valak, the demon nun.",
        image: "https://image.tmdb.org/t/p/w500/v9D9m91SpxI6Gjo9mZUR6BPMY5.jpg",
        releaseDate: "2023-09-08",
        duration: 110,
        genres: "Horror, Mystery, Thriller",
        videoUrl: "https://www.youtube.com/watch?v=QF-oyCwaArU"
    },
    {
        title: "Equalizer 3",
        rating: 6.8,
        totalrating: 95000,
        description: "Robert McCall finds himself at home in Southern Italy but he discovers his friends are under the control of local crime bosses. As events turn deadly, McCall knows what he has to do: become his friends' protector by taking on the mafia.",
        image: "https://image.tmdb.org/t/p/w500/v9D9m91SpxI6Gjo9mZUR6BPMY5.jpg",
        releaseDate: "2023-09-01",
        duration: 109,
        genres: "Action, Crime, Thriller",
        videoUrl: "https://www.youtube.com/watch?v=19iSXY7J_1w"
    },
    {
        title: "Gran Turismo",
        rating: 7.2,
        totalrating: 115000,
        description: "The ultimate wish fulfillment tale of a teenage Gran Turismo player whose gaming skills won a series of Nissan competitions to become an actual professional race car driver.",
        image: "https://image.tmdb.org/t/p/w500/v9D9m91SpxI6Gjo9mZUR6BPMY5.jpg",
        releaseDate: "2023-08-25",
        duration: 134,
        genres: "Action, Adventure, Drama",
        videoUrl: "https://www.youtube.com/watch?v=GVPzGBvPrzw"
    },
    {
        title: "Blue Beetle",
        rating: 6.0,
        totalrating: 92000,
        description: "An alien scarab chooses Jaime Reyes to be its symbiotic host, bestowing the teenager with a suit of armor that's capable of extraordinary and unpredictable powers, forever changing his destiny as he becomes the superhero Blue Beetle.",
        image: "https://image.tmdb.org/t/p/w500/v9D9m91SpxI6Gjo9mZUR6BPMY5.jpg",
        releaseDate: "2023-08-18",
        duration: 127,
        genres: "Action, Adventure, Sci-Fi",
        videoUrl: "https://www.youtube.com/watch?v=vS3_7279_m"
    },
    {
        title: "Meg 2: The Trench",
        rating: 5.0,
        totalrating: 105000,
        description: "A research team encounters multiple threats while exploring the depths of the ocean, including malevolent mining operations and prehistoric sharks.",
        image: "https://image.tmdb.org/t/p/w500/v9D9m91SpxI6Gjo9mZUR6BPMY5.jpg",
        releaseDate: "2023-08-04",
        duration: 116,
        genres: "Action, Adventure, Sci-Fi",
        videoUrl: "https://www.youtube.com/watch?v=dG91B3hHyY4"
    },
    {
        title: "Talk to Me",
        rating: 7.1,
        totalrating: 98000,
        description: "When a group of friends discover how to conjure spirits using an embalmed hand, they become hooked on the new thrill, until one of them goes too far and unleashes terrifying supernatural forces.",
        image: "https://image.tmdb.org/t/p/w500/v9D9m91SpxI6Gjo9mZUR6BPMY5.jpg",
        releaseDate: "2023-07-28",
        duration: 95,
        genres: "Horror, Thriller",
        videoUrl: "https://www.youtube.com/watch?v=aLAKJu9aUXA"
    },
    {
        title: "The Whale",
        rating: 7.7,
        totalrating: 280000,
        description: "A reclusive English teacher attempts to reconnect with his estranged teenage daughter.",
        image: "https://image.tmdb.org/t/p/w500/v9D9m91SpxI6Gjo9mZUR6BPMY5.jpg",
        releaseDate: "2022-12-09",
        duration: 117,
        genres: "Drama",
        videoUrl: "https://www.youtube.com/watch?v=nDiZbehT_L0"
    },
    {
        title: "Babylon",
        rating: 7.0,
        totalrating: 145000,
        description: "A tale of outsized ambition and outrageous excess, it traces the rise and fall of multiple characters during an era of unbridled decadence and depravity in early Hollywood.",
        image: "https://image.tmdb.org/t/p/w500/v9D9m91SpxI6Gjo9mZUR6BPMY5.jpg",
        releaseDate: "2022-12-23",
        duration: 189,
        genres: "Comedy, Drama, History",
        videoUrl: "https://www.youtube.com/watch?v=5muQK7CuV_0"
    },
    {
        title: "The Banshees of Inisherin",
        rating: 7.7,
        totalrating: 220000,
        description: "Two lifelong friends find themselves at an impasse when one abruptly ends their relationship, with alarming consequences for both of them.",
        image: "https://image.tmdb.org/t/p/w500/v9D9m91SpxI6Gjo9mZUR6BPMY5.jpg",
        releaseDate: "2022-10-21",
        duration: 114,
        genres: "Comedy, Drama",
        videoUrl: "https://www.youtube.com/watch?v=uRu3zLOJN2c"
    },
    {
        title: "Glass Onion: A Knives Out Mystery",
        rating: 7.1,
        totalrating: 410000,
        description: "Famed Southern detective Benoit Blanc travels to Greece for his latest case.",
        image: "https://image.tmdb.org/t/p/w500/v9D9m91SpxI6Gjo9mZUR6BPMY5.jpg",
        releaseDate: "2022-12-23",
        duration: 139,
        genres: "Comedy, Crime, Drama",
        videoUrl: "https://www.youtube.com/watch?v=gj5ibYSz8W0"
    },
    {
        title: "Black Panther: Wakanda Forever",
        rating: 6.7,
        totalrating: 350000,
        description: "The people of Wakanda fight to protect their home from intervening world powers as they mourn the death of King T'Challa.",
        image: "https://image.tmdb.org/t/p/w500/v9D9m91SpxI6Gjo9mZUR6BPMY5.jpg",
        releaseDate: "2022-11-11",
        duration: 161,
        genres: "Action, Adventure, Drama",
        videoUrl: "https://www.youtube.com/watch?v=_Z3QKkl1WyM"
    },
    {
        title: "The Menu",
        rating: 7.2,
        totalrating: 340000,
        description: "A young couple travels to a remote island to eat at an exclusive restaurant where the chef has prepared a lavish menu, with some shocking surprises.",
        image: "https://image.tmdb.org/t/p/w500/v9D9m91SpxI6Gjo9mZUR6BPMY5.jpg",
        releaseDate: "2022-11-18",
        duration: 107,
        genres: "Comedy, Horror, Thriller",
        videoUrl: "https://www.youtube.com/watch?v=C_uTkUGcHv4"
    },
    {
        title: "Bullet Train",
        rating: 7.3,
        totalrating: 420000,
        description: "Five assassins aboard a fast-moving bullet train find out their missions have something in common.",
        image: "https://image.tmdb.org/t/p/w500/v9D9m91SpxI6Gjo9mZUR6BPMY5.jpg",
        releaseDate: "2022-08-05",
        duration: 127,
        genres: "Action, Comedy, Thriller",
        videoUrl: "https://www.youtube.com/watch?v=0IOsk2V94yw"
    }
];

const seedExtraMovies = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding extra movies...');

        // Thêm phim vào database
        await Movie.insertMany(extraMovies);
        console.log(`${extraMovies.length} extra movies imported successfully!`);

        process.exit();
    } catch (error) {
        console.error('Error seeding extra movies:', error);
        process.exit(1);
    }
};

seedExtraMovies();
