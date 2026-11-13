const teamHelp = {
    'directly accountable': {
        title: 'Directly accountable',
        text: `The directly accountable for a user is the person who manages it within AMS Tools. It can share access, respond to requests and has access to your information.
            Within the team of your directly accountable, the user is called a direct member.
            If the user has a team, all members of that team will be indirect members of his directly accountable.
            A user can have multiple directly accountables.`
    },
    'indirectly accountable': {
        title: 'Indirectly accountable',
        text: `A user's indirectly accountable is the person who inherits him as a member of his team through his directly accountable. When adding a user who owns a team to your team, all members of that team will become indirect members of him.
            Its main function is to help the directly accountable for the user to manage it, approving requests and granting or removing access.
            His accesses are not shared with the indirect members of his team, and he cannot provide other accesses that the directly accountable of the members do not have.`
    },
    'direct member': {
        title: 'Directly member',
        text: `The direct members of your team are all those who have you as their directly accountable.
            You can only share your access with your direct members.
            If a direct member of yours has a team, all members of that team will be your indirect members.`
    },
    'indirect member': {
        title: 'Indirectly member',
        text: `The indirect members of your team are all those who not have you as their directly accountable.
            When you add a user who has a team to your team, all members of that team will become your indirect members, and you will become their indirect accountable.
            Indirect members are connected with their directly accountable, and therefore do not share access with you and cannot be removed from the team. They will only be removed if their directly accountable is removed.`
    }
};

export default teamHelp;

/*
    Directly accountable

    O responsável direto de um usuário é quem o gerencia dentro do AMS Tools. Ele pode compartilhar acessos, responder à solicitações e tem acesso as suas informações.
    Dentro da equipe do seu responsável direto, o usuário é chamado de membro direto.
    Caso o usuário possua um time, todos os membros desse time serão membros indiretos do seu responsável direto.
    Um usuário pode ter múltiplos responsáveis diretos.

    
    Indirectly accountable

    O responsável indireto de um usuário é quem o herda como membro de sua equipe através do seu responsável direto. Ao adicionar um usuário que possua um time a sua equipe, todos os membros desse time se tornarão membros indiretos dele.
    Sua principal função é auxiliar o responsável direto do usuário a geri-lo, aprovando solicitações e concedendo ou removendo acessos.
    Seus acessos não são compartilhados com os membros indiretos de sua equipe, e ele não pode fornecer outros acessos que os responsáveis direto dos membros não possuam.

    
    Directly member

    Os membros direto de sua equipe são todos aqueles que possuem você como responsável direto.
    Você apenas pode compartilhar seus acessos com seus membros direto.
    Caso um membro direto seu possua um time, todos os membros desse time serão membros indiretos seus.

    
    Indirectly member

    Os membros indiretos de sua equipe são todos aqueles que não possuem você como responsável direto.
    Ao adicionar um usuário que possui um time a sua equipe, todos os membros desse time se tornarão membros indiretos seus, e você se torna responsável indireto deles.  
    Membros indiretos estão conectados com seus responsáveis diretos, e por isso não compartilham acessos com você e nem podem ser removidos da equipe. Eles somente serão removidos caso o seu responsável direto seja removido.

*/