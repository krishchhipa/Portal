import mongoose, { Document } from "mongoose";

interface DUser extends Document {
    username: string;
    email: string;
    password: string;
    role: string; // Add role here
    submissions: Submission[] | undefined;
    problems_starred: string[];
    problems_solved: string[];
    problems_attempted: string[];
    problems_solved_count: number;
    rank: number;
    views: number;
    solution_count: number;
    reputation_count: number;
    arena_wallet_id: String;
    crypto_wallet_id: String;
    transactions: object[];
    current_balance: Number;
}

const userSchema = new mongoose.Schema<DUser>({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "participant"], // Limit the role options
        required: true,
    },
    submissions: Array,
    problems_starred: Array,
    problems_solved: Array,
    problems_attempted: Array,
    problems_solved_count: {
        type: Number,
        default: 0,
    },
    rank: Number,
    views: {
        type: Number,
        default: 0,
    },
    solution_count: {
        type: Number,
        default: 0,
    },
    reputation_count: {
        type: Number,
        default: 0,
    },
    arena_wallet_id: String,
    crypto_wallet_id: {
        type: String,
        default: "",
    },
    transactions: {
        type: [mongoose.Schema.Types.Mixed],
        default: [],
    },
    current_balance: {
        type: Number,
        default: 5000,
    },
});

const UserModel = mongoose.model<DUser>("User", userSchema);

export default UserModel;
