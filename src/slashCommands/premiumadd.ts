import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { SlashCommand } from "../types";  // Assuming you have a type for your commands

const premiumAddCommand: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("premiumadd")
        .setDescription("Add the premium role to a user")
        .addUserOption(option => 
            option.setName("user")
                .setDescription("User to add the premium role to")
                .setRequired(true)
        ),
    execute: async (interaction) => {
        const user = interaction.options.getUser("user");
        if (!user) {
            return interaction.reply({
                content: "User not found.",
                ephemeral: true
            });
        }

        const member = await interaction.guild?.members.fetch(user.id);
        const role = interaction.guild?.roles.cache.get("1307052906540957788");  // Replace with your premium role ID

        if (!member || !role) {
            return interaction.reply({
                content: "Member or role not found.",
                ephemeral: true
            });
        }

        try {
            await member.roles.add(role);
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Success!")
                        .setDescription(`Successfully added the premium role to ${user.tag}.`)
                ]
            });
        } catch (error) {
            console.error(error);
            interaction.reply({
                content: "There was an error adding the premium role.",
                ephemeral: true
            });
        }
    },
    cooldown: 3
};

export default premiumAddCommand;
