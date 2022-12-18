import { Game } from "@structs/game";
import { motion } from "framer-motion";
import Head from "next/head";
import styles from "./layout.module.scss";
import LogoComponent from "./logo.module";

function LayoutComponent({ title, subTitle, game, children }: Props) {
  const description = game?.description ?? "Play card games!";
  return (
    <div className={styles.frame}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <motion.header
        key={title}
        className={styles.title}
        initial={{ x: 300 }}
        animate={{ x: 0 }}
      >
        {title && <h1>{title}</h1>}
        {subTitle && <p>{subTitle}</p>}
      </motion.header>
      {children}
      <LogoComponent />
    </div>
  );
}

export default LayoutComponent;

interface Props {
  title?: string;
  subTitle?: string;
  game?: Game;
  children: JSX.Element | JSX.Element[];
}
