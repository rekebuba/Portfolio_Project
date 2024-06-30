-- prepares a MySQL server for the project

DROP DATABASE IF EXISTS key_dev_db;

CREATE DATABASE IF NOT EXISTS key_dev_db;

CREATE USER IF NOT EXISTS 'key_dev' @'localhost' IDENTIFIED BY 'key_dev_pwd';

GRANT ALL PRIVILEGES ON `key_dev_db`.* TO 'key_dev' @'localhost';

GRANT SELECT ON `performance_schema`.* TO 'key_dev' @'localhost';

FLUSH PRIVILEGES;

-- --
-- -- Table structure for table `paragraph`
-- --

-- use key_dev_db;

-- DROP TABLE IF EXISTS `paragraph`;

-- CREATE TABLE `paragraph` (
--     id INT AUTO_INCREMENT,
--     `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     `text` TEXT NOT NULL,
--     PRIMARY KEY (id)
-- ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

-- --
-- -- Dumping data for table `paragraph`
-- --

-- LOCK TABLES `paragraph` WRITE;

-- INSERT INTO
--     `paragraph` (`text`)
-- VALUES (
--         "Life is a beautiful journey filled with ups and downs, twists and turns. It teaches us to cherish every moment and to learn from our experiences. Remember, every challenge you face is an opportunity to grow and become stronger. The beauty of life lies in its unpredictability; it's like a book with many chapters, each filled with its own unique story. Embrace the unknown, take risks, and don't be afraid to make mistakes. It's through these experiences that we find our true selves and discover our passions. The moments of joy, laughter, and love are what make life truly worth living. When you look back, it's not the material possessions that you'll remember, but the relationships you built, the adventures you embarked on, and the dreams you chased. So, live each day with intention, be kind to yourself and others, and never stop seeking the magic that life has to offer."
--     ),
--     (
--         "Did you know that the human nose can detect over one trillion different scents? Our sense of smell is incredibly sophisticated, thanks to the olfactory receptors in our noses, which can distinguish a vast array of odors. Another remarkable fact about the human body is that our bones are stronger than steel. Ounce for ounce, human bone is five times stronger than steel, making it an extraordinary material. Did you know that humans are the only species known to blush? Blushing is a unique response triggered by the sympathetic nervous system, and it’s thought to be a social signal. Additionally, your stomach lining is replaced every few days to prevent it from digesting itself. The human body is a complex and astonishing system, full of remarkable capabilities and functions that continue to amaze scientists and researchers alike."
--     ),
--     (
--         "The essence of life lies in the small, seemingly insignificant moments that weave together to form the tapestry of our existence. Life is not just about reaching milestones or achieving great success; it's about finding joy in the everyday moments. Whether it's the warmth of a morning cup of coffee, the sound of rain tapping on the window, or the laughter shared with friends, these moments create a sense of fulfillment and happiness. Life is also about resilience, the ability to bounce back from setbacks and keep moving forward. It's about finding strength in adversity and turning obstacles into opportunities. Every experience, whether good or bad, shapes who we are and helps us grow. So, take time to appreciate the little things, be present in the moment, and cultivate gratitude for the journey. Remember, it's the journey, not the destination, that truly matters."
--     ),
--     (
--         "Synesthesia is a neurological phenomenon where stimulation of one sensory or cognitive pathway leads to automatic, involuntary experiences in a second pathway. For example, someone with synesthesia may perceive numbers or letters as having specific colors, or they may associate sounds with tastes. This blending of senses offers a unique perspective on how the brain processes information. Interestingly, synesthesia is thought to be more common among artists, musicians, and poets, suggesting a potential link between creativity and sensory overlap in the brain. Studying synesthesia provides insights into the complexity of human perception and challenges traditional notions of how our senses operate independently. It's a captivating area of study that continues to intrigue researchers and inspire artistic expression."
--     ),
--     (
--         "Stepping into a forest is like entering a sanctuary of tranquility and life. The canopy overhead filters sunlight into a soft, dappled glow, creating an enchanting atmosphere. Every step on the forest floor, cushioned by leaves and moss, brings you closer to nature's intricate tapestry. Birds sing melodious tunes from the treetops, while small creatures scurry through the underbrush. Each plant, from towering trees to delicate ferns, plays a vital role in this thriving ecosystem. The air is rich with the scent of earth and pine, invigorating and soothing at once. Streams wind their way through the forest, their gentle babbling adding to the symphony of sounds. In this peaceful setting, one can find solace and reflection, away from the hustle and bustle of daily life. The forest invites us to slow down, observe, and appreciate the interconnectedness of all living things."
--     ),
--     (
--         "Did you know that a day on Venus is longer than a year on Venus? This intriguing fact arises because Venus takes about 243 Earth days to complete one rotation on its axis but only about 225 Earth days to orbit the Sun. Another fascinating space fact is that there's a planet made of diamonds. Discovered by astronomers, this exoplanet, known as 55 Cancri e, is twice the size of Earth and composed largely of carbon, which could be crystallized as diamond. And did you know that in space, there is no sound? Space is a near-perfect vacuum, meaning sound waves cannot travel through it. The silence of space makes it a vast, eerie expanse. These facts highlight the incredible and often surprising nature of our universe, sparking curiosity and wonder about the cosmos beyond our planet."
--     ),
--     (
--         "Nature's grandeur is on full display in the majestic mountains that punctuate the horizon. These towering giants, with their snow-capped peaks and rugged cliffs, are a testament to the Earth's raw power and beauty. Hiking up a mountain trail reveals breathtaking vistas, where lush valleys and shimmering lakes unfold below. The crisp, clean air invigorates the senses, and the serene silence is occasionally broken by the call of an eagle or the rustle of a mountain breeze. As you ascend, the changing landscapes from dense forests to alpine meadows highlight the incredible biodiversity that thrives in these heights. The mountains remind us of nature's scale and our place within it, offering a sense of perspective and peace. Standing at the summit, with the world spread out before you, it's impossible not to feel a deep connection to the Earth and a profound respect for its timeless beauty."
--     ),
--     (
--         "Did you know that octopuses have three hearts? Two hearts pump blood to the gills, while the third pumps it to the rest of the body. Additionally, their blood is blue because it contains a copper-rich protein called hemocyanin, which is more efficient at transporting oxygen in cold and low-oxygen environments. Another fascinating animal fact is that honey never spoils. Archaeologists have discovered pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible. This is due to honey's low water content and natural acidity, which create an inhospitable environment for bacteria. Did you know that sloths can hold their breath longer than dolphins? Sloths can slow their heart rate and hold their breath for up to 40 minutes underwater, whereas dolphins typically hold their breath for about 10 minutes. These facts showcase the incredible adaptations and characteristics of animals in our world."
--     ),
--     (
--         'Quantum entanglement is a phenomenon in quantum mechanics where particles become interconnected in such a way that the state of one particle instantly affects the state of another, regardless of the distance between them. This concept, famously described by Albert Einstein as "spooky action at a distance," defies classical intuition but has been repeatedly observed in experiments. It forms the basis of quantum computing and cryptography, promising revolutionary advancements in technology. The implications of quantum entanglement stretch beyond physics, touching on philosophical questions about the nature of reality and the limits of our understanding. Exploring this phenomenon leads into a realm where the rules of classical physics no longer apply, opening doors to new possibilities and challenging our perception of the universe at its most fundamental levels.'
--     ),
--     (
--         "Imagine a technique where you can memorize vast amounts of information by visualizing it within the rooms of an imaginary palace. This technique, known as the method of loci or memory palace technique, dates back to ancient Greece and Rome. In this method, each piece of information you want to remember is associated with a specific location or landmark within a mental palace. As you mentally walk through the palace, you can recall the information based on its spatial placement. This method leverages our spatial memory, which is particularly strong, and has been used by memory champions to memorize entire decks of cards, lists of numbers, and more. It's a fascinating example of how our minds can be trained to harness innate abilities for remarkable feats of memory."
--     );

-- UNLOCK TABLES;
