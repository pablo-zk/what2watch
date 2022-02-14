<?php

namespace App\Controller;

use App\Entity\Kid;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Entity\User;
use App\Entity\ContentList;
use Symfony\Component\Security\Core\Security;

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

        $user = $this->getDoctrine()->getRepository(User::class)->findOneBy([
            'username' => $username,
        ]);
        if($user != null){
            return $this->json([
                'message' => 'ERROR. User already exists.',
            ]);
        }
        $password = $content->password;
        $user = new User($username);
        $user->setPassword($encoder->encodePassword($user, $password));

        $list = new ContentList();
        $list->setTitle('Me gusta');
        $list->setIcon('heart');
        $em->persist($list);
        $em->flush();

        $user->addList($list);
        $em->persist($user);
        $em->flush();
        return new JsonResponse([
            'message' => 'Usuario registrado',
            'id_token' => $user->getPassword(),
        ]);
    }
    /**
     * @Route("/check/{username}", name="check", methods="get")
     */
    public function check($username, Security $security)
    {
         $user = $this->getDoctrine()->getRepository(User::class)->findOneBy([
             'username' => $username,
             ]);


         $data = [
             "username" => $user->getUserIdentifier(),
             "password" =>  $user->getPassword()
         ];

        return $this->json([
            $data,
        ]);
    }

     /**
      * @Route("/state", name="get-state")
      */
     public function getState(Request $request){
         $em = $this->getDoctrine()->getManager();
         $data = $request->getContent();
         $content = json_decode($data);
         $username = $content->username;
         $db_user = $em->getRepository(User::class)->findOneBy([
             'username' => $username,
         ]);
         if($db_user == null){
             $state = 0;
         }else{
             $state = $db_user->getState();
         }

         return $this->json([
             "state" => $state
         ]);
     }

    /**
     * @Route("/role", name="role", methods="post")
     */
    public function role(Request $request, UserPasswordEncoderInterface $encoder)
    {
        $em = $this->getDoctrine()->getManager();
        // IMP! To get JSON format from POST method
        $data = $request->getContent();
        $content = json_decode($data);
        $username = $content->username;
        $db_user = $em->getRepository(User::class)->findOneBy([
            'username' => $username,
        ]);
        return new JsonResponse( $db_user->getRoles());
    }
}
