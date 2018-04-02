<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 3/27/2018
 * Time: 11:20 AM
 */

namespace App\Controller;

use Interactions\FormBundle\Form\Type\DomoType;
use Interactions\FormBundle\Entity\Domo;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;


class DomoController extends Controller
{
    /**
     * @Route("/registration")
     */
    public function  index(Request $request) {
        $person = new Domo();

        $form = $this->createForm(DomoType::class, $person);


        $form->handleRequest($request);

        if ($form->isSubmitted() ){
            if($form->isValid() ) {
            // $form->getData() holds the submitted values
            // but, the original `$task` variable has also been updated
            $form->getData();

            // ... perform some action, such as saving the task to the database
            // for example, if Task is a Doctrine entity, save it!
             $entityManager = $this->getDoctrine()->getManager();
             $entityManager->persist($person);
             $entityManager->flush();

              return $this->json(['success' => true]);
        } else {

                $errors = [];
                /**
                 * @var  $key
                 * @var \Symfony\Component\Form\FormError $error
                 */
                foreach ($form->getErrors(true) as $key => $error) {
                    $errors[$error->getOrigin()->getName()] = $error->getMessage();

                }
           //     return $this->json(['success' => false, 'errors' => $errors]);
            }

        }
        return $this->render('default/domo.html.twig', array(
            'form' => $form->createView(),
        ));
    }

    /**
     * @Route("/index")
     */
    public function myFunction()
    {
        $repository = $this->getDoctrine()->getRepository(Domo::class );
        $person = $repository->findAll();
        return $this->render('index.html.twig', ['person' => $person]);
    }


}