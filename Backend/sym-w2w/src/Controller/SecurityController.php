<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Entity\User;

class SecurityController extends AbstractController
{
    /**
     * @Route("/register", name="register", methods="post")
     */
    public function register(Request $request, UserPasswordEncoderInterface $encoder)
    {
        $em = $this->getDoctrine()->getManager();
        // IMP! To get JSON format from POST method
        $data = $request->getContent();
        $content = json_decode($data);
        $username = $content->username;
        $password = $content->password;
        $user = new User();
        $user->setUsername($username);
        $user->setPassword($encoder->encodePassword($user, $password));
        $em->persist($user);
        $em->flush();
        return new JsonResponse([
            'message' => 'Usuario registrado',
            'id_token' => $user->getPassword(),
        ]);
    }

    // /**
    //  * @Route("/state", name="get-state")
    //  */
    // public function getState(Request $request){
    //     $em = $this->getDoctrine()->getManager();
    //     $data = $request->getContent();
    //     $content = json_decode($data);
    //     $username = $content->username;
    //     $db_user = $em->getRepository(User::class)->findOneBy([
    //         'username' => $username,
    //     ]);
    //     $state = $db_user->getState();
    //     return $this->json([
    //         "state" => $state 
    //     ]);
    // }
}
