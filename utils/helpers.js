module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
            date
        ).getFullYear()}`;
    },
    format_blog: blog => {
        return blog
            .slice(0, 300)+"..."
    },
    format_blog2: blog => {
        return blog
            .slice(0, 100)+"..."
    },
    format_plural: (word, amount) => {
        if (amount !== 1) {
            return `${word}s`;
        }

        return word;
    }
};