import { Player } from "@structs/player";
import PlayerComponent from "@components/player/player.module";
import styles from "./players.module.scss";
import ModalComponent from "@components/global/modal.module";
import PlayerMenuComponent from "@components/player/player_menu.module";
import { useState } from "react";
import { motion } from "framer-motion";

const PLAYER_COUNT = process.env.NEXT_PUBLIC_MINIMUM_PLAYER_COUNT as unknown as number;

function PlayersComponent({ players, currentPlayer, removePlayer, addPlayer, shufflePlayers }: Props) {
    const [addPlayerIsOpen, setAddPlayerIsOpen] = useState(false);

    const onPlayerAdd = (player: Player) => {
        const result = addPlayer(player);
        if (result) setAddPlayerIsOpen(false);
        return result;
    }

    return (
        <motion.section
            className={styles.main}

            variants={{ show: { transition: { staggerChildren: .05 } } }}
            initial="hidden"
            animate="show"
        >

            {/* Modal */}

            {addPlayerIsOpen &&
                <ModalComponent onClose={() => setAddPlayerIsOpen(false)}>
                    <PlayerMenuComponent
                        addPlayer={onPlayerAdd}
                        players={players}
                    />
                </ModalComponent>
            }


            {/* Add */}
            <motion.article
                className={styles.playerButton}
                onClick={() => setAddPlayerIsOpen(true)}

                // Animation
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                variants={{
                    hidden: { opacity: 0, scale: .1 },
                    show: { opacity: 1, scale: 1 },
                }}
            >
                +
            </motion.article>



            {/* Players */}
            {players.map(player =>
                <PlayerComponent
                    key={player.name}
                    player={player}
                    removePlayer={removePlayer}
                    canRemove={players.length > PLAYER_COUNT && player.name !== currentPlayer.name}
                    active={currentPlayer.name === player.name}
                />
            )}


            {/* Shuffle */}
            <motion.article
                className={styles.playerButton}
                onClick={shufflePlayers}

                // Animation
                variants={{
                    hidden: { opacity: 0, scale: .1 },
                    show: { opacity: 1, scale: 1 },
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                +
            </motion.article>


        </motion.section>
    );

}

interface Props {
    players: Player[];
    currentPlayer: Player;
    removePlayer: (player: Player) => void;
    addPlayer: (player: Player) => boolean;
    shufflePlayers: () => void;
}

export default PlayersComponent;
